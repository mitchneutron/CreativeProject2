          $(document).ready(function() {
            $(".searchbox").on("keypress", function(e) {
              if (e.keyCode == 13) {
                console.log("keypressed")
                search();
              }
            })
          });
          function search(str) {
            $.ajax({
              url: "https://en.wikipedia.org/w/api.php",
              jsonp: "callback",
              dataType: 'jsonp',
              data: {
                action: "query",
                list: "search",
                srsearch: $(".searchbox").val(),
                srinfo: "suggestion",
                srlimit: "10",
                format: "json"
              },
              xhrFields: {
                withCredentials: true
              },
              success: displayResults
            });
          
          }
          function displayResults(data) {
              $('#results').empty();
              
              $.each(data.query.search, function(index, obj) {
                var outstring = "";
                outstring += "<a href='https://en.wikipedia.org/wiki/" + obj.title.replace(" ", "_") + "' target=&quot;_blank&quot;>";
                outstring += "<div class='result'>";
                outstring += "<p class='title'>";
                outstring += obj.title;
                outstring += "</p>";
                outstring += "<p class='snippet'>"
                outstring += obj.snippet;
                outstring += "</p>";
                outstring += "</div>";
                outstring += "</a>";
                $("#results").append(outstring);
              }); 
          }
