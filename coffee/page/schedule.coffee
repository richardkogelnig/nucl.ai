root = exports ? this # global

timelineIntervalRange = 15
disableEmptyIntervals = true
cellMargin = null # is calculated later $("div.interval").first().css("padding-top").split("px")[0]
$ ->
  speakers = $("section.program-schedule p.speakers")
  # pre parse text firt
  speakers.each ->
    if $(@).find(".studio").length > 1
      studios = []
      $(@).find(".studio").each ->
        studios.push $(@)
      for studio, idx in studios
        if idx < studios.length - 1
            if studio.html() == studios[idx+1].html() then studio.remove()

  days = []
  $("section.program-schedule table.talks-list").each ->
    days.push $(@)

  for day in days
    talks = day.find("div.track")
    day.talks = []
    talks.each ->
      day.talks.push $(@)

    # sort by time and append
    # and remember first start and last end
    talksStartTime = null
    talksFinishTime = null
    
    for talk in day.talks
      startTime = talk.attr("time-start")
      finishTime = talk.attr("time-finish")
      talk.startDate = new Date("2001/01/01 " + startTime)
      talk.finishDate = new Date("2001/01/01 " + finishTime)

    day.talks.sort (a,b) ->
      if talksStartTime == null || talksStartTime > a.startDate then talksStartTime = a.startDate
      if talksStartTime == null || talksStartTime > b.startDate then talksStartTime = b.startDate
      if talksFinishTime == null || talksFinishTime < a.finishDate then talksFinishTime = a.finishDate
      if talksFinishTime == null || talksFinishTime < b.finishDate then talksFinishTime = b.finishDate

      a.startDate - b.startDate

    #set duration attribute
    for talk in day.talks
      duration = (talk.finishDate.getHours() * 60 + talk.finishDate.getMinutes()) - (talk.startDate.getHours() * 60 + talk.startDate.getMinutes())
      talk.attr("duration", duration)
      offset = (talk.startDate.getHours() * 60 + talk.startDate.getMinutes()) - (talksStartTime.getHours() * 60 + talksStartTime.getMinutes())
      talk.attr("offset", offset)
      if talk.finishDate.getHours() == talksFinishTime.getHours() && talk.finishDate.getMinutes() == talksFinishTime.getMinutes()
        talk.attr("last", "true")

    markEmpty = (interval) ->
      interval.empty = false
      for talk in day.talks
        if talk.startDate <= interval.startDate && talk.finishDate >= interval.finishDate then return
      interval.empty = true
      interval.attr("empty", true)
      interval.addClass("empty")


    if $("section.rooms-schedule").length > 0 
      # append all talks to rooms
      day.find("td.talks-list").remove()
      for talk in day.talks
        room = talk.attr("room")
        day.find("td." + room).append(talk)
        #set up timeline
      talksDuration = (talksFinishTime.getHours() * 60 + talksFinishTime.getMinutes()) - (talksStartTime.getHours() * 60 + talksStartTime.getMinutes())
      intervalsCount = talksDuration / timelineIntervalRange
      day.intervals = []
      lastInterval = null
      for idx in [0...intervalsCount]
        interval = day.find("td.timeline div.interval.pattern").clone().removeClass("pattern")
        intervalDate = new Date(talksStartTime)
        intervalDate.setMinutes(intervalDate.getMinutes() + idx * timelineIntervalRange)
        interval.startDate = new Date(intervalDate)
        minutes = if intervalDate.getMinutes() >= 10 then intervalDate.getMinutes() else "0" + intervalDate.getMinutes() 
        startTime = intervalDate.getHours() + ":" + minutes
        intervalDate.setMinutes(intervalDate.getMinutes() +  timelineIntervalRange)
        interval.finishDate = new Date(intervalDate)
        minutes = if intervalDate.getMinutes() >= 10 then intervalDate.getMinutes() else "0" + intervalDate.getMinutes() 
        finishTime = intervalDate.getHours() + ":" + minutes
        interval.find(".interval-time.start").text(startTime)
        if idx == intervalsCount - 1
          interval.find(".interval-time.finish").text(finishTime)
        if disableEmptyIntervals
          markEmpty(interval)
          interval.displayed = true
          if lastInterval != null and lastInterval.empty and interval.empty
            interval.addClass("next-empty") 
            interval.displayed = false
          if !interval.empty and lastInterval != null and lastInterval.empty and !lastInterval.hasClass("next-empty") then lastInterval.addClass("orhpaned-empty")
          lastInterval = interval
          
        day.find("td.timeline").append(interval)
        day.intervals.push(interval)


    else
      # simple append and set up timeline duration
      day.find("td.talks-list").html("")
      day.append(day.talks)
    day.removeClass("not-initialized")
    

  if $("section.rooms-schedule").length == 0 then return

  cellMargin = $("div.interval").first().css("padding-top").split("px")[0]

  #calculate time / height ratio
  maxHeightDurationRatio = 0
  $("table.talks-list div.track").each ->
    height = $(@).height()
    duration = $(@).attr("duration")
    ratio = height / duration
    if ratio > maxHeightDurationRatio then maxHeightDurationRatio = ratio

  #set up ratio based size
  $("table.talks-list div.track").each ->
    duration = $(@).attr("duration")
    timelineAlignment = ((duration / timelineIntervalRange) - 1 ) * cellMargin
    $(@).height( (duration * maxHeightDurationRatio) + timelineAlignment )

  #set up interval scale
  intervalHeight = timelineIntervalRange * maxHeightDurationRatio
  $("table.talks-list td.timeline div.interval:not(.cover-empty)").each ->
    $(@).height(intervalHeight)
  timeLineExtenstion = null 
  $("table.talks-list td.timeline div.interval:last-child").each ->
    if timeLineExtenstion == null then timeLineExtenstion = $(@).find(".finish").height()
    currentHeight = $(@).height()
    $(@).height timeLineExtenstion + currentHeight
  $("div.track[last='true']").each ->
    currentHeight = $(@).height()
    $(@).height currentHeight + timeLineExtenstion + parseInt(cellMargin)

  #allign top position
  for day in days

    emptyIntervals = (talk) ->
      empty = 0
      for interval in day.intervals
        if not interval.displayed && interval.startDate < talk.startDate then empty++
        if interval.startDate >= talk.startDate then return empty # all are sorted
      return empty

    for talk in day.talks
      offset = talk.attr("offset")
      positionTop = offset * maxHeightDurationRatio
      margin = ((offset / timelineIntervalRange) + 1 ) * cellMargin
      positionTop = positionTop + margin
      positionTop = positionTop - emptyIntervals(talk) * intervalHeight
      positionTop = positionTop - emptyIntervals(talk) * cellMargin
      talk.css("top", positionTop + "px")

  assignIntervals = (talk) ->
    talk.intervals = []
    for interval in day.intervals
      if interval.startDate >= talk.startDate and interval.finishDate <= talk.finishDate
        talk.intervals.push(interval)

  talkHoverStart = (talk) ->
    for interval in talk.intervals
      interval.addClass("hovered")
    talk.addClass("hovered")
  talkHoverEnd = (talk) ->
    for interval in talk.intervals
      interval.removeClass("hovered")
    talk.removeClass("hovered")

  #set up on hover effect
  for day in days
    for talk in day.talks
      talk.hover () ->
        console.log talk
      ,
        () ->
        console.log talk


  $("section.program-schedule table").click ->
    button = $(@).find(".button-expand")
    button.toggleClass "expanded"
    name = button.attr "name"
    talksList = $("table.talks-list[name='" + name + "']")
    talksList.removeClass "not-expanded"
    if ! button.hasClass("expanded")
      talksList.addClass "zoomOut"
    else
      talksList.removeClass "zoomOut"
    talksList.one animate.onAnimatedEnd, ->
      if ! button.hasClass("expanded")
        talksList.addClass("not-expanded")

