if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.creativeorangeFontAwesome = function () {
    return {
        init: function () {
            var button = this.button.add('creativeorangeFontAwesome', 'Font Awesome icons');
            this.button.addCallback(button, this.creativeorangeFontAwesome.show);
            this.button.setIcon(button, '<i class="far fa-smile"</i>');
        },
        getTemplate: function (modal, len, icons) {
            return String()
                + '<script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>\n'
                + '<section id="redactor-modal-advanced">'
                + '<div class="iconFilterStyle"><p>Choose a category and style or search for individual icons:</p>'
                + '<select name="iconTheme" id="iconStyle">'
                + '<option value="" disabled="true" selected>Choose a category...</option>'
                + '<option value="all">All Themes</option>'
                + '<option value="accessibility">Accessibility</option>'
                + '<option value="arrows">Arrows</option>'
                + '<option value="audiovideo">Audio & Video</option>'
                + '<option value="business">Business</option>'
                + '<option value="charity">Charity</option>'
                + '<option value="chat">Chat</option>'
                + '<option value="chess">Chess</option>'
                + '<option value="code">Code</option>'
                + '<option value="communications">Communication</option>'
                + '<option value="computers">Computers</option>'
                + '<option value="currency">Currency</option>'
                + '<option value="datetime">Date & Time</option>'
                + '<option value="design">Design</option>'
                + '<option value="editors">Editors</option>'
                + '<option value="files">Files</option>'
                + '<option value="genders">Genders</option>'
                + '<option value="hands">Hands</option>'
                + '<option value="health">Health</option>'
                + '<option value="images">Images</option>'
                + '<option value="interfaces">Interfaces</option>'
                + '<option value="logistics">Logistics</option>'
                + '<option value="maps">Maps</option>'
                + '<option value="medical">Medical</option>'
                + '<option value="moving">Moving</option>'
                + '<option value="objects">Objects</option>'
                + '<option value="payment">Payment & Shopping</option>'
                + '<option value="shapes">Shapes</option>'
                + '<option value="spinners">Spinners</option>'
                + '<option value="sports">Sports</option>'
                + '<option value="status">Status</option>'
                + '<option value="people">Users & People</option>'
                + '<option value="vehicles">Vehicles</option>'
                + '<option value="writing">Writing</option>'
                + '</select><br><br>'
                + '<select name="iconTheme" id="iconStyle">'
                + '<option value="" disabled="true" selected>Choose a style...</option>'
                + '<option value="all">All Styles</option>'
                + '<option value="fas">Solid</option>'
                + '<option value="far">Regular</option>'
                + '<option value="fal">Light</option>'
                + '<option value="fab">Brands</option>'
                + '</select>'
                + '</div><hr>'
                + '<div class="iconFilterInput"><input placeholder="Search for icons" id="iconSearchBox" type="text" /></div>'
                + '<div id="iconContents" class="iconContents"></div>'
                + '<div class="colourContents"><p id="sampleColour"><i class="fa fa-square"></i></p></div>'
                + '</section>'
                + '<section>'
                + '<button id="redactor-modal-button-action">Insert</button>'
                + '<button id="redactor-modal-button-cancel">Cancel</button>'
                + '</section>';
        },
        show: function () {
            // Load all icons and categories.
            var icons = null;
            var categories = null;

            var iconsXML = new XMLHttpRequest();
            var categoriesXML = new XMLHttpRequest();



            categoriesXML.onload = function() {
                if (this.readyState == 4 && this.status == 200) {
                    categories = JSON.parse(this.responseText);
                }
            };
            categoriesXML.onerror = function(e) {
                console.log(this.statusText);
            };

            iconsXML.open("GET", "../../../assets/json/faicons.json", true);
            iconsXML.onload = function(e) {
                if (this.readyState == 4 && this.status == 200) {
                    icons = JSON.parse(this.responseText);
                }
            };
            iconsXML.onerror = function(e) {
                console.log(this.statusText);
            };
            iconsXML.send();


            categoriesXML.open("GET", "../../../assets/json/facategories.json", true);
            categoriesXML.send();

            this.modal.addTemplate('creativeorangeFontAwesome', this.creativeorangeFontAwesome.getTemplate(icons.length, icons));
            this.modal.load('creativeorangeFontAwesome', 'Font awesome icons', 800);
            // this.modal.createCancelButton();

            var blkstr = [];

            icons.forEach(function(icon) {
                var iconCategory = '';
                var iconStyle = '';
                console.log(icon);

                //Get the icon category.
                for (var i = 0; i < categories; i++) {
                    var category = categories[i];
                    for (var i = 0; i < category[0]; i++) {
                        var compareIcon = category[0][i];
                        if (icon === compareIcon) {
                            iconCategory = categories[i];
                        }
                    }
                }

                //Get the icon styles.
                for (var i = 0; i < icon.styles; i++) {
                    var style = icon.styles[i]
                    if (style === "brand") {
                        iconStyle = 'fab';
                    } else if (style === "solid") {
                        iconStyle = 'fas';
                    } else if (style === "regular") {
                        iconStyle = 'far';
                    } else if (style === "light") {
                        iconStyle = 'fal';
                    }
                }
                // var listcons = $('<i class="' + icon + '" id="redactor-fa-' + icon + '"><span>' + icon + '</span></i>');
                blkstr.push('<div><i class="' + iconCategory + iconStyle + ' fa-' + icon + '" id="redactor-fa-' + icon + '"></i><br><span>' + icon.label + '</span></div>');

            });
            // for (var i = 0; i < icons.length; i++) {
            //
            // }

            $(".iconContents").html(blkstr.join(""));

            $(".iconContents div").on('click', function () {
                $(".iconContents div").removeClass('active');
                $(this).addClass('active');
            });

            //Load and select colours. ======================================================= PLUGIN CUSTOMIZATION ===
            //Colours added here should match css class names under fontAwesome.css and in your public assets.
            //NOTE: In 'getTemplate,' the following string is customized:
            //          + '<div class="colourContents"><p id="sampleColour"><i class="fa fa-square"></i></p></div>'
            var colours = ['default', 'white-color', 'light-color', 'light-blue-color', 'aqua-color', 'dark-blue-color', 'red-color', 'teal-color', 'orange-color'];
            var lenCol = colours.length;
            var selCol = $("<select></select>").attr("id", "selCol").attr("name", "selCol");
            for (var z = 0; z < lenCol; z++) {
                var colour = colours[z];
                selCol.append("<option value='" + colour + "'>" + colour + "</option>");
            }

            $(".colourContents").append(selCol);

            $("#selCol").change(function () {
                $("#sampleColour").removeClass().addClass($(this).val());
            });
            //================================================================================ END OF CUSTOMIZATION ===

            //Process user requests.
            var savebutton = this.modal.getActionButton('Insert');
            savebutton.on('click', this.creativeorangeFontAwesome.insert);

            this.selection.save();
            this.modal.show();

            // Filter icons by style
            $('#iconStyle').change(function () {
                var valStyle = $(this).val().toLowerCase();
                if (valStyle === 'all') {
                    $('.iconContents>div>i').each(function () {
                        $(this).parent().show();
                    });
                } else {
                    $('.iconContents>div>i').each(function () {
                        var text = $(this).attr('class');
                        (text.indexOf(valStyle) === 0) ? $(this).parent().show() : $(this).parent().hide();
                    });
                }
            });

            // Filter icons by search
            $('#iconSearchBox').keyup(function () {
                var valSearch = $(this).val().toLowerCase();
                $('.iconContents>div>i').each(function () {
                    var text = $(this).text().toLowerCase();
                    (text.indexOf(valSearch) === 0) ? $(this).parent().show() : $(this).parent().hide();
                });
            });

        },
        insert: function () {
            var str = $(".iconContents div.active span").text();

            //Load and select colours. ======================================================= PLUGIN CUSTOMIZATION ===
            var chosenCol = $("#selCol").val();
            if (chosenCol === "Default") {
                chosenCol = '';
            }
            //console.log(str);

            this.modal.close();
            this.selection.restore();

            var node = $('<span />').html('<i class="' + str + ' ' + chosenCol + '"></i>', false);
            //================================================================================ END OF CUSTOMIZATION ===

            this.insert.node(node);
            this.code.sync();
        }

    };
};