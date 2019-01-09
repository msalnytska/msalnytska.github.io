 setCal()
     
    function getTime() {
   
      var now = new Date()
      var hour = now.getHours()
      var minute = now.getMinutes()
      now = null
      var ampm = ""


      if (hour >= 12) {
        hour -= 12
        ampm = "PM"
      } else
        ampm = "AM"
      hour = (hour == 0) ? 12 : hour

      if (minute < 10)
        minute = "0" + minute 

      return hour + ":" + minute + " " + ampm
    }

    function leapYear(year) {
      if (year % 4 == 0) 
        return true 
      return false 
    }

    function getDays(month, year) {
     
      var ar = new Array(12)
      ar[0] = 31 // January
      ar[1] = (leapYear(year)) ? 29 : 28 // February
      ar[2] = 31 // March
      ar[3] = 30 // April
      ar[4] = 31 // May
      ar[5] = 30 // June
      ar[6] = 31 // July
      ar[7] = 31 // August
      ar[8] = 30 // September
      ar[9] = 31 // October
      ar[10] = 30 // November
      ar[11] = 31 // December

      return ar[month]
    }

    function getMonthName(month) {
      // create array to hold name of each month
      var ar = new Array(12)
      ar[0] = "January"
      ar[1] = "February"
      ar[2] = "March"
      ar[3] = "April"
      ar[4] = "May"
      ar[5] = "June"
      ar[6] = "July"
      ar[7] = "August"
      ar[8] = "September"
      ar[9] = "October"
      ar[10] = "November"
      ar[11] = "December"

      
      return ar[month]
    }

    function setCal() {
    
      var now = new Date()
      var year = now.getYear()
      if (year < 1000)
        year += 1900
      var month = now.getMonth()
      var monthName = getMonthName(month)
      var date = now.getDate()
      now = null

      // create instance of first day of month, and extract the day on which it occurs
      var firstDayInstance = new Date(year, month, 1)
      var firstDay = firstDayInstance.getDay()
      firstDayInstance = null

      // number of days in current month
      var days = getDays(month, year)

      // call function to draw calendar
      drawCal(firstDay, days, date, monthName, year)
    }
      

    function drawCal(firstDay, lastDate, date, monthName, year) {
     
      var headerHeight = 40 // height of the table's header cell
      var border = 0 // 3D height of table's border
      var cellspacing = 4 // width of table's border
      var headerColor = "#c0301c" // color of table's header
      var headerSize = "+3" // size of tables header font
      var colWidth = 50 // width of columns in table
      var dayCellHeight = 25 // height of cells containing days of the week
      var dayColor = "#777777" // color of font representing week days
      var cellHeight = 40 // height of cells representing dates in the calendar
      var todayColor = "red" // color specifying today's date in the calendar
      var timeColor = "#c0301c" // color of font representing current time
     
    
      // create basic table structure
      var text = "" // initialize accumulative variable to empty string
      text += '<CENTER> Time ' + getTime() + '</CENTER>'
      text += '<CENTER><FONT COLOR="' + headerColor + '" SIZE=' + headerSize + '>' + ' '   + ' ' + monthName + ' ' + year + ' ' + ' ' + '</CENTER></FONT>'
      text += '<CENTER>'
      text += '<TABLE BORDER=' + border + ' CELLSPACING=' + cellspacing + '>' // table settings
      text += '<TH COLSPAN=5 HEIGHT=' + headerHeight + '>' // create table header cell
 // close table header's font settings
      text += '</TH>' // close header cell

      // variables to hold constant settings
      var openCol = '<TD WIDTH=' + colWidth + ' HEIGHT=' + dayCellHeight + '>'
      openCol += '<FONT COLOR="' + dayColor + '">'
      var closeCol = '</FONT></TD>'

      // create array of abbreviated day names
      var weekDay = new Array(7)
      weekDay[0] = "Mon"
      weekDay[1] = "Tues"
      weekDay[2] = "Wed"
      weekDay[3] = "Thu"
      weekDay[4] = "Fri"
      weekDay[5] = "Sat"
      weekDay[6] = "Sun"

      // create first row of table to set column width and specify week day
      text += '<TR ALIGN="center" VALIGN="center">'
      for (var dayNum = 0; dayNum < 7; ++dayNum) {
        text += openCol + weekDay[dayNum] + closeCol
      }
      text += '</TR>'

      // declaration and initialization of two variables to help with tables
      var digit = 1
      var curCell = 1

      for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row) {
        text += '<TR ALIGN="center" VALIGN="center">'
        for (var col = 1; col <= 7; ++col) {
          if (digit > lastDate)
            break
          if (curCell < firstDay) {
            text += '<TD></TD>';
            curCell++
          } else {
            if (digit == date) { // current cell represent today's date
              text += '<TD HEIGHT=' + cellHeight + '>'
              text += '<FONT COLOR="' + todayColor + '">'
              text += digit
              text += '</FONT><BR>'
              text += '<FONT COLOR="' + timeColor + '" SIZE=2>'
              // text += '<CENTER>' + getTime() + '</CENTER>'
              text += '</FONT>'
              text += '</TD>'
            } else
              text += '<TD HEIGHT=' + cellHeight + '>' + digit + '</TD>'
            digit++
          }
        }
        text += '</TR>'
      }

      // close all basic table tags
      text += '</TABLE>'
      text += '</CENTER>'

      // print accumulative HTML string
      document.write(text)
      
    }