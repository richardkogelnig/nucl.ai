$ ->  
  setSponsorsSize = () ->
    $("section.sponsors item.sponsor").each ->
      sponsor = $(this)
      sponsor.height(sponsor.width())

  $(window).resize ->
    setSponsorsSize()

  setSponsorsSize();