(function(){var a;a="undefined"!=typeof exports&&null!==exports?exports:this,a.config={mobile:{size:432},header:{scrollSpeed:500},thumbnails:{borderSize:.015},mapOptions:{scrollwheel:!1,zoom:18,mapTypeId:google.maps.MapTypeId.ROADMAP}},moment.tz.setDefault("Europe/Austria")}).call(this),function(){var a;a="undefined"!=typeof exports&&null!==exports?exports:this,a.animate={onAnimatedEnd:"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",onTransitonEnd:"transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"}}.call(this),function(){$(function(){var a,b,c,d,e,f,g,h,i,j,k,l;if(0!==$("section.program-schedule").length&&url("?export")&&"csv"===url("?export")){for(d=[],$(".list-schedule  table.talks-list").each(function(){return d.push($(this))}),h=[],e=i=0,k=d.length;k>i;e=++i)c=d[e],b=c.attr("date"),c.schedule=[],c.find(".track").each(function(){var a,d,f,g,i,j,k,l,m,n;return a=dateInVienna(b+" "+$(this).attr("time-start")),g=dateInVienna(b+" "+$(this).attr("time-finish")),j=$(this).find("p.title span.room-name").text().trim().replace(/\s+/g," "),m=$(this).find("p.speakers").text().trim().replace(/\s+/g," "),n=$(this).find("p.title span.title").text().trim().replace(/\s+/g," "),$(this).find("p.title a").hasClass("wip")&&(d=""),$(this).hasClass("break")&&(n=$(this).text().trim().replace(/\s+/g," "),d="",j=""),l={topic:n,speakers:m,room:j,start:a,finish:g,day:e+1},i=!1,url("?room")&&url("?room")!==l.room&&(i=!0),url("?day")&&parseInt(url("?day"))!==l.day&&(i=!0),url("?duration")&&(f=l.finish-l.start,k=Math.floor(f/1e3/60),"short"===url("?duration")&&k>=45&&(i=!0),"long"===url("?duration")&&45>k&&(i=!0)),i?void 0:(c.schedule.push(l),h.push(l))});for(g="topic,speakers,room,start,finish,day\r\n",h.sort(function(a,b){return a.start-b.start}),j=0,l=h.length;l>j;j++)f=h[j],g+='"'+f.topic+'","'+f.speakers+'",'+f.room+","+f.start+","+f.finish+","+f.day+"\r\n";return a=new Blob([g],{type:"text/csv;charset=utf-8"}),saveAs(a,"schedule.csv")}})}.call(this),function(){var a;a="undefined"!=typeof exports&&null!==exports?exports:this,$(function(){var b,c;if(0!==$("section.events").lenght)return c=new google.maps.Geocoder,b=function(){return $("div.map.event").each(function(){var b;return b=$(this),c.geocode({address:b.attr("location")},function(c,d){var e,f,g,h,i;return b.lat=c[0].geometry.location.lat(),b.lng=c[0].geometry.location.lng(),f=b[0],e=new google.maps.LatLng(c[0].geometry.location.lat(),c[0].geometry.location.lng()),b.map=new google.maps.Map(f,$.extend(a.config.mapOptions,{center:e})),b.attr("placeId")?(i=new google.maps.places.PlacesService(b.map),h={placeId:b.attr("placeId")},i.getDetails(h,function(a,c){var d;return c===google.maps.places.PlacesServiceStatus.OK?(d=new google.maps.Marker({map:b.map,position:a.geometry.location}),b.map.setCenter(a.geometry.location)):void 0})):g=new google.maps.Marker({position:e,map:b.map})})})},google.maps.event.addDomListener(window,"load",b)})}.call(this),function(){var a,b,c,d,e;c="undefined"!=typeof exports&&null!==exports?exports:this,d="fadeInLeftBig",e="fadeOutRightBig",a="fadeInRightBig",b="fadeOutLeftBig",$(function(){var a;return a=function(a,b,c,f,g){var h,i;return i=function(a,d,e,f){var g;return g=function(){return b.find("item[name='"+a.attr("name")+"']").hasClass("selected")||a.removeClass("selected"),c.hasClass("selected")?(a=d.find("item[name='"+c.attr("name")+"']"),a.removeClass(f),a.addClass("selected "+e),a.one(animate.onAnimatedEnd,function(){return c.hasClass("selected")?(a.find("div.cover").removeClass("fadeIn"),a.find("div.cover").addClass("fadeOut")):void 0})):void 0},a.hasClass("selected")&&!b.find("item[name='"+a.attr("name")+"']").hasClass("selected")?(a.addClass(f),a.removeClass(e),a.addClass(f),a.one(animate.onAnimatedEnd,g)):void 0},h=a.find("item.selected"),h.find("div.cover").hasClass("fadeOut")?(h.find("div.cover").removeClass("fadeOut"),h.find("div.cover").addClass("fadeIn"),h.one(animate.onAnimatedEnd,function(){return i(h,a,d,e)})):i(h,a,d,e)},$("gallery").each(function(){var b,c,f;return b=$(this),c=b.find("menu"),f=b.find("slides"),c.find("item").click(function(){var b,g;return b=$(this),g=c.find("item.selected"),g.is(b)?!1:(g.removeClass("selected"),b.addClass("selected"),a(f,c,b,d,e))})})})}.call(this),function(){var a;a="undefined"!=typeof exports&&null!==exports?exports:this,$(function(){return $(".ical-button").each(function(){var a,b,c,d,e,f,g,h,i;for(f=$(this),e=ics(),g=f.attr("source")?f.attr("source"):"",c=[],$(".list-schedule "+g+" table.talks-list").each(function(){return c.push($(this))}),h=0,i=c.length;i>h;h++)b=c[h],a=b.attr("date"),d=a.replace("/","-"),b.find(".track").each(function(){var b,c,d,f,g,h;return b=dateInVienna(a+" "+$(this).attr("time-start")),d=dateInVienna(a+" "+$(this).attr("time-finish")),f=$(this).find("p.title span.room-name").text().trim().replace(/\s+/g," "),g=$(this).find("p.speakers").text().trim().replace(/\s+/g," "),h=$(this).find("p.title span.title").text().trim().replace(/\s+/g," "),g&&(h=h+" ["+g+"]"),c=window.location.host+$(this).find("p.title a").attr("href"),$(this).find("p.title a").hasClass("wip")&&(c=""),$(this).hasClass("break")&&(h=$(this).text().trim().replace(/\s+/g," "),c="",f=""),e.addEvent(h,c,f,b,d)});return f.click(function(){return $("html").hasClass("safari")?$("popup.ical").addClass("active"):e.download(f.attr("filename")),!1})})})}.call(this),function(){}.call(this),function(){$(function(){return $("#speakers-section").length>0&&new Thumbnails("speakers-section",!0,!1),$("#chairs-section").length>0&&new Thumbnails("chairs-section",!0,!1),$("#team-section").length>0?new Thumbnails("team-section",!0,!1):void 0})}.call(this),function(){$(function(){var a;return a=function(){return $("section.sponsors item.sponsor").each(function(){var a;return a=$(this),a.height(a.width())})},$(window).resize(function(){return a()}),a()})}.call(this),function(){var a;a="undefined"!=typeof exports&&null!==exports?exports:this,$(function(){var a,b,c,d,e;return e=$("section.stream-link"),0!==e.length?(b=e.find("div.stream-data"),c=e.find(".announcement.live"),a=e.find(".announcement.check"),d=!1,b.find("span.day").each(function(){var a,b,c;return b=new Date($(this).attr("date-start")),a=new Date($(this).attr("date-finish")),b<=(c=new Date)&&a>=c?d=!0:void 0}),d?(c.addClass("block"),e.addClass("live")):(a.addClass("block"),e.addClass("check"))):void 0})}.call(this),function(){var a,b,c,d,e;d="flipInX",e="flipOutX",b=450,a=1e4,c="",$(function(){var f;return f=[],$("section.testimonials").each(function(){var f,g,h,i,j,k;return k=$(this).find(".testimonial").toArray(),$(this).hasClass("domino")?(g=0,i=0,f=function(){var c;return c=a,g%2!==0&&(c=b),setTimeout(j,c)},h=function(a,b){return a+=b,a===k.length?0:a===k.length+1?1:a},j=function(){var a,b;return 2===i?f():(i+=1,$(k[g]).removeClass(d),$(k[g]).addClass(e),b=g,a=h(g,2),g=h(g,1),f(),$(k[b]).one(animate.onAnimatedEnd,function(f){if(""===c)c=f.type;else if(c!==f.type)return;return i-=1,$(k[b]).removeClass("selected"),$(k[a]).removeClass(e),$(k[a]).addClass("selected "+d)}))},f()):(g=0,(j=function(){return $(k[g]).removeClass(d),$(k[g]).addClass(e),$(k[g]).one(animate.onAnimatedEnd,function(b){if(""===c)c=b.type;else if(c!==b.type)return;return $(k[g]).removeClass("selected"),g=g===k.length-1?g=0:g+1,$(k[g]).removeClass(e),$(k[g]).addClass("selected "+d),setTimeout(j,a)})})())})})}.call(this),function(){$(function(){var a;if(0!==$("#section-topics").length)return a=new Thumbnails("section-topics",!1,!0,!1)})}.call(this),function(){var a;a="undefined"!=typeof exports&&null!==exports?exports:this,$(function(){var a;return a=function(a){return a.find("item .button-content").each(function(){var a,b;return a=$(this),b=a.parent().height(),a.height(b),a.width(b),a.parent().hover(function(){var b;return b=a.parent().height(),a.height(b),a.width(b)},function(){return a.height(b),a.width(b)})})},$(".links-buttons").each(function(){var b;return b=$(this),new Thumbnails(b.attr("id"),!1,!0,!1),a(b),$(window).resize(function(){return a(b)})})})}.call(this),function(){$(function(){var a,b,c,d,e,f,g;if(0!==$("#section-lobby").length)return c=function(a,b){return a.getMonth()===b.getMonth()&&a.getDate()===b.getDate()},a=1,e=function(a){return $(".credits").length>0&&a?$(".credits").height(a.parent().outerHeight()):void 0},g=function(){var b,d,f;return b=new Date,null!==url("?date")&&(b=new Date(decodeURIComponent(url("?date")))),d=0,null!==url("?offset")&&(d=parseInt(url("?offset"))),b.setMinutes(b.getMinutes()+d),f="all",url("?room")&&(f=url("?room")),$("table").each(function(){var d,g,h,i,j,k,l,m;if(g=$(this).attr("date"),d=new Date(g),c(b,d)){for(i=[],$(this).find("div.track").each(function(){return"all"===f||"all"===$(this).attr("room")||f===$(this).attr("room")?i.push($(this)):$(this).remove()}),i.sort(function(a,b){return a.dateStart=new Date(g+" "+a.attr("time-start")),a.dateEnd=new Date(g+" "+a.attr("time-finish")),b.dateStart=new Date(g+" "+b.attr("time-start")),b.dateEnd=new Date(g+" "+b.attr("time-finish")),a.dateStart-b.dateStart}),j=a,m=[],k=0,l=i.length;l>k;k++)h=i[k],$(".show-current").length>0?h.dateStart<=b&&h.dateEnd>b&&j>0?(h.show(),e(h),h.addClass("selected"),m.push(j--)):(h.hide(),m.push(h.removeClass("selected"))):h.dateStart>=b&&j>0?(h.show(),h.addClass("selected"),e(h),m.push(j--)):(h.hide(),m.push(h.removeClass("selected")));return m}return $(this).hide(),$(this).removeClass("selected")}),setTimeout(g,1e3)},b=1e4,f=function(){var a,c,d,e,g,h,i,j,k,l,m,n,o;for(c=new Date,null!==url("?date")&&(c=new Date(decodeURIComponent(url("?date")))),e=[],$(".sponsors-list .day").each(function(){var a;return a=$(this),a.date=new Date(a.attr("date")),e.push(a)}),a=null,l=0,n=e.length;n>l;l++)d=e[l],d.date.getDate()===c.getDate()?(a=d.addClass("selected"),d.height(d.width())):d.removeClass("selected");for(i=[],a.find(".sponsor-wrap").each(function(){return i.push($(this))}),g=!1,m=0,o=i.length;o>m;m++)if(h=i[m],h.hasClass("selected"))h.removeClass("selected"),g=!0;else if(g){h.addClass("selected");break}return 0===a.find(".sponsor-wrap.selected").length&&a.find(".sponsor-wrap").first().addClass("selected"),k=b,$(".sponsor-wrap.selected").attr("duration")&&(j=parseInt($(".sponsor-wrap.selected").attr("duration"))),setTimeout(f,j)},d=function(){return $(".credits").hasClass("on")?($(".credits").removeClass("on"),$(".credits").hide(),setTimeout(d,parseInt($(".credits").attr("interval-off")))):($(".credits").addClass("on"),$(".credits").show(),setTimeout(d,parseInt($(".credits").attr("interval-on"))))},$(".credits").length>0&&("true"===$(".credits").attr("show-on-start")?d():setTimeout(d,parseInt($(".credits").attr("interval-off")))),g(),f()})}.call(this),function(){var a,b,c,d;c="undefined"!=typeof exports&&null!==exports?exports:this,c.scrollLocked=!1,d=function(a,b){var d;return c.scrollLocked=!0,d=$("html, body").animate({scrollTop:b},config.header.scrollSpeed,function(){}).promise(),d.done(function(){return history.replaceState?(history.replaceState(null,null,"#"+a),setTimeout(function(){return c.scrollLocked=!1},300)):void 0})},c.scroll=d,b=function(){var a;if($("content").length!==$("content.visited").length)return a=$(window).scrollTop()+$(window).height(),$("section").each(function(){return $(this).offset().top<a?$(this).find("content, h2").addClass("visited"):void 0})},$(window).load(function(){return c.scrollLocked=!1}),a=function(){return $("a.wip").click(function(){return!1})},$(function(){return navigator.userAgent.match(/(iPad|iPhone|iPod)/g)&&$("html").addClass("ios"),navigator.userAgent.toLowerCase().indexOf("safari")>-1&&-1===navigator.userAgent.toLowerCase().indexOf("chrome")&&$("html").addClass("safari"),$(window).scroll(function(){return b(),!c.scrollLocked&&""!==window.location.hash&&(.95*$(window.location.hash).offset().top>$(window).scrollTop()||1.05*$(window.location.hash).offset().top<$(window).scrollTop())&&history.replaceState?history.replaceState(null,null," "):void 0}),b(),a()}),b(),c.disableWip=a,c.dateInVienna=function(a){var b,c;return moment.tz.setDefault("Europe/Vienna"),c=a.replace(/\//g," "),b=moment(c,"YYYY MM DD HH:mm"),new Date(b.toString())}}.call(this),function(){var a;a="undefined"!=typeof exports&&null!==exports?exports:this,$(function(){var b,c,d,e,f,g;return $(document).keyup(function(a){return 27===a.keyCode?$(".navigation .expanded").each(function(){return $(this).removeClass("expanded")}):void 0}),e=$(".navigation"),g=$("section.splash-screen"),d=$(".navigation a"),d.each(function(){var a;return this.jQlink=$(this),a=this.jQlink.attr("href")?this.jQlink.attr("href").split("#")[1]:"",this.jQscrollTo=$("#"+a),a&&""!==a?this.jQsection=$("section."+a):this.jQsection=[]}),c=$(".navigation a.expanded"),$("html").click(function(){return c=$(".navigation a.expanded"),c.toggleClass("expanded"),c.parent().toggleClass("expanded"),c=$(".navigation a.expanded")}),d.each(function(){return this.jQlink.click(function(b){var d;return b.stopPropagation(),this.jQlink.hasClass("expandable")&&!this.jQlink.hasClass("disabled")?(this.jQlink.toggleClass("expanded"),this.jQlink.parent().toggleClass("expanded"),1===c.length&&c[0]!==this.jQlink[0]&&(c.toggleClass("expanded"),c.parent().toggleClass("expanded")),c=$(".navigation a.expanded"),!1):(1===c.length&&(c.toggleClass("expanded"),c.parent().toggleClass("expanded"),c=$(".navigation a.expanded")),this.jQlink.hasClass("disabled")?!1:this.jQlink.attr("href")?(d=this.jQlink.attr("href"),"/"===d.substring(0,1)?!0:(a.scroll(this.jQscrollTo.attr("id"),this.jQscrollTo.offset().top),!1)):void 0)})}),f=function(){var a;return a=null,d.each(function(){return 0!==this.jQsection.length&&$(window).scrollTop()+e.height()>=-1+this.jQsection.first().offset().top&&$(window).scrollTop()+e.height()<this.jQsection.last().offset().top+this.jQsection.last().height()&&e.hasClass("sticky")?a=this.jQlink:void 0}),e.find("item.selected").removeClass("selected"),a?(a.hasClass("logo")&&a.parent().parent().addClass("selected"),a.parent().addClass("selected")):void 0},b=function(){return"/stream/"===window.location.pathname||($(this).scrollTop()>g.height()?e.addClass("sticky"):e.removeClass("sticky"),$("sections.page").length>0)?void 0:f()},$(window).scroll(function(){return b()}),b()})}.call(this),function(){}.call(this),function(){$(function(){var a;if(0!==$("#section-tracks").length)return a=new Thumbnails("section-tracks",!0,!0)})}.call(this),function(){var a,b,c,d;c="undefined"!=typeof exports&&null!==exports?exports:this,d=15,b=!0,a=null,$(function(){var e,f,g;return f=$("section.program-schedule p.speakers"),f.each(function(){var a,b,c,d,e,f;if($(this).find(".studio").length>1){for(c=[],$(this).find(".studio").each(function(){return c.push($(this))}),f=[],a=d=0,e=c.length;e>d;a=++d)b=c[a],a<c.length-1&&b.html()===c[a+1].html()?f.push(b.remove()):f.push(void 0);return f}}),e=function(){return $("section.program-schedule grid").each(function(){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,aa,ba;for(z=$(this),h=[],z.find("table.talks-list").each(function(){return h.push($(this))}),g=J=0,N=h.length;N>J;g=++J){if(f=h[g],f.addClass("not-initialized"),f.addClass("not-positioned"),E=f.find("div.track"),f.talks=[],0===E.length)return;for(E.each(function(){return $(this).attr("time-start")&&$(this).attr("time-finish")?f.talks.push($(this)):void 0}),H=null,G=null,Y=f.talks,K=0,O=Y.length;O>K;K++)B=Y[K],A=B.attr("time-start"),l=B.attr("time-finish"),B.startDate=new Date(f.attr("date")+"  "+A),B.finishDate=new Date(f.attr("date")+"  "+l);for(f.talks.sort(function(a,b){return(null===H||H>a.startDate)&&(H=a.startDate),(null===H||H>b.startDate)&&(H=b.startDate),(null===G||G<a.finishDate)&&(G=a.finishDate),(null===G||G<b.finishDate)&&(G=b.finishDate),a.startDate-b.startDate}),Z=f.talks,m=L=0,P=Z.length;P>L;m=++L)B=Z[m],B.attr("idx",m),B.attr("day",g),i=60*B.finishDate.getHours()+B.finishDate.getMinutes()-(60*B.startDate.getHours()+B.startDate.getMinutes()),B.attr("duration",i),w=60*B.startDate.getHours()+B.startDate.getMinutes()-(60*H.getHours()+H.getMinutes()),B.attr("offset",w),B.finishDate.getHours()===G.getHours()&&B.finishDate.getMinutes()===G.getMinutes()&&B.attr("last","true");if(t=function(a){var b,c,d;for(a.empty=!1,d=f.talks,b=0,c=d.length;c>b;b++)if(B=d[b],B.startDate<=a.startDate&&B.finishDate>=a.finishDate)return;return a.empty=!0,a.attr("empty",!0),a.addClass("empty")},z.hasClass("rooms-schedule")){for(f.find("td.talks-list").remove(),_=f.talks,M=0,Q=_.length;Q>M;M++)B=_[M],y=B.attr("room"),y&&""!==y&&"all"!==y?f.find("td."+y).append(B):f.find("td.breaks").append(B);for(F=60*G.getHours()+G.getMinutes()-(60*H.getHours()+H.getMinutes()),q=F/d,f.intervals=[],r=null,f.find("td.timeline div.interval").each(function(){var a;return a=$(this),a.hasClass("pattern")||a.hasClass("cover-empty")?void 0:a.remove()}),m=U=0;q>=0?q>U:U>q;m=q>=0?++U:--U)n=f.find("td.timeline div.interval.pattern").clone().removeClass("pattern"),o=new Date(H),o.setMinutes(o.getMinutes()+m*d),n.startDate=new Date(o),v=o.getMinutes()>=10?o.getMinutes():"0"+o.getMinutes(),A=o.getHours()+":"+v,n.addClass(o.getHours()+"_"+v),o.setMinutes(o.getMinutes()+d),n.finishDate=new Date(o),v=o.getMinutes()>=10?o.getMinutes():"0"+o.getMinutes(),l=o.getHours()+":"+v,n.find(".interval-time.start").text(A),m===q-1&&n.find(".interval-time.finish").text(l),b&&(t(n),n.displayed=!0,null!==r&&r.empty&&n.empty&&(n.addClass("next-empty"),n.displayed=!1),n.empty||null===r||!r.empty||r.hasClass("next-empty")||r.addClass("orhpaned-empty"),r=n),f.find("td.timeline").append(n),f.intervals.push(n)}else f.find("td.talks-list").html(""),f.append(f.talks),f.removeClass("not-positioned");f.removeClass("not-initialized"),c.disableWip()}if(z.hasClass("rooms-schedule")&&0!==$("div.interval").length){for(a=$("div.interval").first().css("padding-top").split("px")[0],u=0,z.find("table.talks-list div.track").each(function(){var a,b;return a=$(this).height(),i=$(this).attr("duration"),b=a/i,b>u?u=b:void 0}),z.find("table.talks-list div.track").each(function(){var b;return i=$(this).attr("duration"),b=(i/d-1)*a,$(this).height(i*u+b)}),p=d*u,I=null,z.find("table.talks-list td.timeline div.interval:not(.cover-empty)").each(function(){return $(this).height(p)}),I=z.find("table.talks-list td.timeline div.interval:last-child .finish").height(),z.find("table.talks-list td.timeline div.interval:last-child").each(function(){var a;return a=$(this).height(),$(this).height(I+a)}),z.find("div.track[last='true']").each(function(){var b;return b=$(this).height(),$(this).height(b+I+parseInt(a))}),j=Math.floor((p-I)/2),z.find("table.talks-list td.timeline div.interval .ellipsis").each(function(){return $(this).css("bottom",j)}),V=0,R=h.length;R>V;V++)for(f=h[V],k=function(a){var b,c,d,e;for(b=0,e=f.intervals,d=0,c=e.length;c>d;d++)if(n=e[d],!n.displayed&&n.startDate<a.startDate&&b++,n.startDate>=a.startDate)return b;return b},aa=f.talks,W=0,S=aa.length;S>W;W++)B=aa[W],w=B.attr("offset"),x=w*u,s=(w/d+1)*a,x+=s,x-=k(B)*p,x-=k(B)*a,B.css("top",x+"px");for(e=function(a){var b,c,d,e;for(a.intervals=[],d=f.intervals,e=[],c=0,b=d.length;b>c;c++)n=d[c],(n.startDate.getHours()===a.startDate.getHours()&&n.startDate.getMinutes()===a.startDate.getMinutes()||n.startDate.getHours()===a.finishDate.getHours()&&n.startDate.getMinutes()===a.finishDate.getMinutes())&&n.addClass("edge"),n.startDate>=a.startDate&&n.finishDate<=a.finishDate?e.push(a.intervals.push(n)):e.push(void 0);return e},D=function(a){var b,c,d;for(m=$(this).attr("idx"),f=$(this).attr("day"),B=h[f].talks[m],d=B.intervals,m=c=0,b=d.length;b>c;m=++c)n=d[m],n.addClass("hovered"),m===B.intervals.length-1&&n.addClass("hovered-edge");return B.addClass("hovered")},C=function(a){var b,c,d;for(m=$(this).attr("idx"),f=$(this).attr("day"),B=h[f].talks[m],d=B.intervals,c=0,b=d.length;b>c;c++)n=d[c],n.removeClass("hovered"),n.removeClass("hovered-edge");return B.removeClass("hovered")},ba=[],X=0,T=h.length;T>X;X++)f=h[X],ba.push(function(){var a,b,c,d;for(c=f.talks,d=[],b=0,a=c.length;a>b;b++)B=c[b],B.find("a").hasClass("wip")||(e(B),B.hover(D,C),d.push(f.removeClass("not-positioned")));return d}());return ba}})},e(),g=$("section grid.rooms-schedule").css("display"),$(window).resize(function(){var a;return"none"===g&&(a=$("section grid.rooms-schedule").css("display"),a!==g)?(g=a,e()):void 0}),$("section.program-schedule table").click(function(){var a,b,c;return a=$(this).find(".button-expand"),a.toggleClass("expanded"),b=a.attr("name"),c=$("table.talks-list[name='"+b+"']"),c.removeClass("not-expanded"),a.hasClass("expanded")?c.removeClass("zoomOut"):c.addClass("zoomOut"),c.one(animate.onAnimatedEnd,function(){return a.hasClass("expanded")?void 0:c.addClass("not-expanded")})})})}.call(this),function(){var a;a="undefined"!=typeof exports&&null!==exports?exports:this,$(function(){return 0!==$("sections.page section.stream").length?$("table.talks-list").each(function(){var b,c;return c=$(this),b=c.attr("date"),c.find(".track").each(function(){var c,d,e,f,g;return g=$(this),g.attr("time-start")?(f=g.attr("time-start"),c=a.dateInVienna(b+f),d=c.getHours()<10?"0"+c.getHours().toString():c.getHours().toString(),e=c.getMinutes()<10?"0"+c.getMinutes().toString():c.getMinutes().toString(),g.find(".time").html(d+":"+e)):void 0})}):void 0})}.call(this),function(){var a;a="undefined"!=typeof exports&&null!==exports?exports:this,$(function(){var b,c,d,e;if(0!==$("section.tickets").length&&(b=function(){return d("in",$(this))},c=function(){return d("out",$(this))},d=function(a,b){var c;return c=b.parent().parent(),b.parent().hasClass("invisible")?void 0:(b.parent().find(".centered-cell").each(function(){return $(this).parent().hasClass("titlerow")||$(this).parent().hasClass("invisible")||("in"===a&&$(this).addClass("hovered"),"out"!==a)?void 0:$(this).removeClass("hovered")}),b.hasClass("all-access")&&c.find(".all-access .centered-cell").each(function(){return"in"===a&&$(this).addClass("hovered"),"out"===a?$(this).removeClass("hovered"):void 0}),b.hasClass("conference")&&c.find(".conference .centered-cell").each(function(){return"in"===a&&$(this).addClass("hovered"),"out"===a?$(this).removeClass("hovered"):void 0}),b.hasClass("single-day")?c.find(".single-day .centered-cell").each(function(){return"in"===a&&$(this).addClass("hovered"),"out"===a?$(this).removeClass("hovered"):void 0}):void 0)},$("div.table").hover(b,c),e=function(){return 0===$("#purchase").length&&(window.location="/tickets/#purchase"),a.scroll("purchase",$("#purchase").offset().top)},$(".buy-tickets-link").click(function(){return e(),!1}),0!==$(".tickets.prices, .tracks-content.tickets").length))return $(".tickets.prices .centered-cell, .conference-good .centered-cell, .tracks-content.tickets .centered-cell").click(function(){return"Access to the Main Amphitheatre"===$(this).parent().parent().attr("name")?(window.location="/program/overview/#main-amphitheatre",!1):"Access to the Masterclass Room"===$(this).parent().parent().attr("name")?(window.location="/program/overview/#masterclass-room",!1):"Access to the Open Laboratory"===$(this).parent().parent().attr("name")?(window.location="/program/overview/#open-laboratories",!1):e()})})}.call(this),function(){var a;a="undefined"!=typeof exports&&null!==exports?exports:this,$(function(){var b;return $("#section-tracks-menu").length>0&&(b=new Thumbnails("section-tracks-menu",!0,!0)),$("#track-content").length>0&&(b=new Thumbnails("track-content",!0,!0)),$("#section-tracks-people").length>0&&(b=new Thumbnails("section-tracks-people",!0,!0)),$("h3 a, li a.scrollable, .tracks-people .track-topic a, .talks-list a").click(function(){var b;return b=$(this).attr("href").split("#")[1],$(this).hasClass("wip")?!1:$("#"+b).length>0?(a.scroll(b,$("#"+b).offset().top),!1):void 0})})}.call(this),function(){var a;a="undefined"!=typeof exports&&null!==exports?exports:this,$(function(){var b;if(0!==$("section.venu").lenght)return b=function(){var b,c,d,e;return d=$("#venue-map-canvas")[0],null!==d?(b=new google.maps.LatLng(48.217192,16.353283),c=new google.maps.Map(d,$.extend(a.config.mapOptions,{center:b})),e=new google.maps.Marker({position:b,map:c})):void 0},google.maps.event.addDomListener(window,"load",b)})}.call(this),function(){$(function(){return $("popup .close").click(function(){return $(this).parent().removeClass("active")})})}.call(this),function(){$(function(){return $("logo-wrap").addClass("rotated"),$("content").removeClass("opacity0")})}.call(this),function(){var a,b;b="undefined"!=typeof exports&&null!==exports?exports:this,a=function(){function a(a,c,d,e){var f,g;return this.animated=c,this.justSize=d,this.drawSvg=e,g=this,this.section=$("#"+a),1!==this.section.length?void console.warn("Can't discover section "+section_selector):(this.paper=Raphael(a,"100%","100%"),this.svg=this.section.find("svg"),this.wraps=this.section.find("thumbnail-wrap"),this.shortBios=this.section.find("div.short-bio-wrap"),this.thumbnails=this.section.find("a.thumbnail"),this.checkBckgImg(),$(window).resize(function(){return g.setThumbnailSize(),g.svg&&g.svg.find("path").length>0?(g.clearLine(),g.drawLine()):void 0}),this.thumbnails.each(function(){var a;return this.jQthumbnail=$(this),this.jQdescription=g.section.find(".description[name='"+$(this).attr("name")+"']"),this.jQtitle=g.section.find("item.thumbnail .thumbnail-title[name='"+$(this).attr("name")+"']"),a=this,a.jQthumbnail.hover(function(){return a.jQtitle.addClass("hover")},function(){return a.jQtitle.removeClass("hover")})}),this.setThumbnailSize(),this.justSize?void this.thumbnails.each(function(){return this.jQthumbnail.hasClass("disabled")&&this.jQthumbnail.click(function(){return!1}),this.jQthumbnail.hasClass("scrollable")?this.jQthumbnail.click(function(){var a;return a=$(this).attr("href").split("#")[1],b.scroll(a,$(".tracks-people #"+a).offset().top).done(function(){return $(".tracks-people #thumbnail-id-"+a).hasClass("selected")?void 0:$(".tracks-people #thumbnail-id-"+a).click()}),!1}):void 0}):(this.selected=this.thumbnails.filter(".selected"),0===this.selected.length&&(this.selected=null),c=this.animated,this.animated||this.thumbnailsNotAnimated(),this.animated&&this.thumbnailsAnimated(),void(""!==window.location.hash&&(f=window.location.hash.substring(1),0===$("#thumbnail-id-"+f+".selected").length&&this.section.find("#thumbnail-id-"+f).click()))))}return a.prototype.fadeOut=function(a){return a.jQdescription.removeClass("fadeInLeft"),a.jQdescription.addClass("fadeOutRight")},a.prototype.fadeIn=function(a){return a.jQdescription.addClass("fadeInLeft"),a.jQdescription.removeClass("fadeOutRight")},a.prototype.selectThumbnail=function(a){return a.jQthumbnail.addClass("selected"),a.jQtitle.addClass("selected"),this.animated?void 0:a.jQdescription.addClass("selected")},a.prototype.deselectThumbnail=function(a){return a.jQthumbnail.removeClass("selected"),a.jQtitle.removeClass("selected"),this.animated?void 0:a.jQdescription.removeClass("selected")},a.prototype.thumbnailsAnimated=function(){var a;return a=this,this.thumbnails.each(function(){var b;return b=this,b.jQthumbnail.click(function(){var c;return a.selected?b===a.selected?(a.deselectThumbnail(b),a.selected=null,a.clearLine(),a.fadeOut(b),b.jQdescription.one(animate.onAnimatedEnd,function(){return a.selected!==b?b.jQdescription.removeClass("selected"):void 0})):(a.clearLine(),a.deselectThumbnail(a.selected),a.selectThumbnail(b),c=a.selected,a.selected=b,c.jQdescription.hasClass("fadeInLeft")?(a.fadeOut(c),c.jQdescription.one(animate.onAnimatedEnd,function(){return a.selected!==c&&(c.jQdescription.removeClass("selected"),a.selected&&a.selected.jQdescription.hasClass("fadeOutRight"))?(c=a.selected,a.selected.jQdescription.addClass("selected"),a.fadeIn(a.selected),c.jQdescription.one(animate.onAnimatedEnd,function(){return a.selected===c&&a.selected&&a.selected.jQdescription.hasClass("fadeInLeft")?a.drawLine():void 0})):void 0})):(b.jQdescription.addClass("selected"),a.fadeIn(b),a.selected=b,b.jQdescription.one(animate.onAnimatedEnd,function(){return a.selected===b?(a.selected.jQdescription.addClass("selected"),a.drawLine()):void 0}))):(a.clearLine(),a.selectThumbnail(b),a.selected=b,0===a.section.find("item.description.selected").length?(b.jQdescription.addClass("selected"),a.fadeIn(b),b.jQdescription.one(animate.onAnimatedEnd,function(){return a.selected===b&&a.selected.jQdescription.hasClass("fadeInLeft")?(a.selected.jQdescription.addClass("selected"),a.drawLine()):void 0})):a.section.find("item.description.selected").one(animate.onAnimatedEnd,function(){return a.selected===b?(a.fadeIn(b),a.selected.jQdescription.addClass("selected"),a.selected.jQdescription.one(animate.onAnimatedEnd,function(){return a.selected===b&&a.selected.jQdescription.hasClass("fadeInLeft")?a.drawLine():void 0})):void 0})),!1})})},a.prototype.thumbnailsNotAnimated=function(){var a;return a=this,this.thumbnails.each(function(){var b;return b=this,b.jQthumbnail.click(function(){return a.selected?b===a.selected?(a.deselectThumbnail(b),a.selected=null,a.clearLine()):(a.clearLine(),a.deselectThumbnail(a.selected),a.selectThumbnail(b),a.selected=b,a.drawLine()):(a.selectThumbnail(b),a.selected=b,a.drawLine())})})},a.prototype.checkBckgImg=function(){return this.thumbnails.each(function(){var a,b,c;return a=$(this),b=a.css("background-image"),c=b.substring(4,b.length-1),('"'===c.charAt(0)||"'"===c.charAt(0))&&(c=c.slice(1,-1)),$("<img/>").attr("src",c).load(function(){return $(this).remove()}).error(function(){return $(this).remove(),a.css("background-image",""),a.addClass("logo")})})},a.prototype.setThumbnailSize=function(){var a,b;return this.wraps.each(function(){var a;return a=$(this),a.height(a.width())}),a=this.wraps.first().width(),this.thumbnails.each(function(){var b;return b=a*config.thumbnails.borderSize,1>b&&(b=1),this.jQthumbnail.css({"border-width":b}),this.jQthumbnail.css({opacity:1})}),b=this.wraps.first().height(),this.shortBios.each(function(){return $(this).height(b)})},a.prototype.clearLine=function(){return this.svg?this.svg.find("path").remove():void 0},a.prototype.drawLine=function(){var a,b,c,d,e,f,g,h;if(this.svg&&(g=this.selected,h=g.jQdescription.find(".thumbnail-title"),g=g.jQthumbnail,f=g.offset().top-this.section.offset().top+g.outerHeight(),e=g.offset().left+g.width()/2,!(g.hasClass("column-first")&&h.offset().left<=e||g.hasClass("column-last")&&h.offset().left>=e)))return b=h.offset().top+h.outerHeight()-this.section.offset().top,d=b,g.hasClass("column-first")?a=h.offset().left+h.width():g.hasClass("column-last")?a=h.offset().left:b-=h.outerHeight(),(g.hasClass("column-first")||g.hasClass("column-last")||g.hasClass("column-middle"))&&(c=this.paper.path("M"+e+" "+f+"L "+e+" "+b+" L "+a+" "+b)),g.hasClass("column-first")||g.hasClass("column-last")?void 0:this.paper.path("M "+h.offset().left+" "+d+"L "+(h.offset().left+h.width())+" "+d)},a}(),b.Thumbnails=a}.call(this),function(){var defaultOptions,mobileOptions,root;root="undefined"!=typeof exports&&null!==exports?exports:this,defaultOptions={scaleColor:!1,trackColor:"rgba(255,255,255,0.3)",barColor:"#E7F7F5",lineWidth:8,lineCap:"butt",size:105,animate:{duration:1e3,enabled:!0}},mobileOptions={lineWidth:4,size:50},$(function(){var activateTimer,getScale,update;return getScale=function(a){return a.hasClass("days")?31:a.hasClass("hours")?24:60},update=function(a){var b,c,d,e,f;for(f=[],d=0,e=a.length;e>d;d++)b=a[d],c=100*b.find(".value").html()/getScale(b),b.data("easyPieChart").update(c),f.push(setTimeout(function(){}));return f},(activateTimer=function(name){return $("timer-dashboard").each(function(){var clocks,options,tCountTo,tOff,timer;return timer=$(this),clocks=[],options=timer.parent().parent().hasClass("mobile")?$.extend({},defaultOptions,mobileOptions):defaultOptions,timer.find("clock").each(function(){return clocks.push($(this).easyPieChart(options))}),timer.attr("name")===name&&(timer.parent().show(),tCountTo=dateInVienna(timer.attr("count-to")),
timer.countdown(tCountTo,function(event){return"finish"===event.type&&timer.attr("on-finish")&&event.finalDate.getHours()===tCountTo.getHours()&&event.finalDate.getMinutes()===tCountTo.getMinutes()&&timer.attr("on-finish")&&eval(timer.attr("on-finish")),event.strftime("%S")!==timer.find(".seconds").find(".value").html()?(timer.find(".days").find(".value").html(event.strftime("%D")),timer.find(".hours").find(".value").html(event.strftime("%H")),timer.find(".minutes").find(".value").html(event.strftime("%M")),timer.find(".seconds").find(".value").html(event.strftime("%S")),update(clocks)):void 0}),timer.attr("off"))?(tOff=dateInVienna(timer.attr("off")),timer.parent().countdown(tOff,function(event){return"finish"===event.type&&timer.attr("on-off")&&event.finalDate.getHours()===tOff.getHours()&&event.finalDate.getMinutes()===tOff.getMinutes()?eval(timer.attr("on-off")):void 0})):void 0})})($("timer-dashboard").first().attr("name"))})}.call(this);