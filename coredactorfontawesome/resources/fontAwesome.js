if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.creativeorangeFontAwesome = function () {
    return {
        init: function () {
            var button = this.button.add('creativeorangeFontAwesome', 'Font Awesome icons');
            this.button.addCallback(button, this.creativeorangeFontAwesome.show);
            this.button.setIcon(button, '<i class="far fa-smile"</i>');
        },
        getTemplate: function () {
            return String()
                + '<script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>\n'
                + '<section id="redactor-modal-advanced">'
                + '<div class="iconFilterStyle"><p>Choose a category and style or search for individual icons:</p>'
                + '<select name="iconCategory" id="iconCategory">'
                + '<option value="" disabled="true" selected>Choose a category...</option>'
                + '<option value="category-all">All Categories</option>'
                + '<option value="accessibility">Accessibility</option>'
                + '<option value="arrows">Arrows</option>'
                + '<option value="audio-video">Audio & Video</option>'
                + '<option value="business">Business</option>'
                + '<option value="charity">Charity</option>'
                + '<option value="chat">Chat</option>'
                + '<option value="chess">Chess</option>'
                + '<option value="code">Code</option>'
                + '<option value="communication">Communication</option>'
                + '<option value="computers">Computers</option>'
                + '<option value="currency">Currency</option>'
                + '<option value="date-time">Date & Time</option>'
                + '<option value="design">Design</option>'
                + '<option value="editors">Editors</option>'
                + '<option value="files">Files</option>'
                + '<option value="gender">Genders</option>'
                + '<option value="hands">Hands</option>'
                + '<option value="health">Health</option>'
                + '<option value="images">Images</option>'
                + '<option value="interfaces">Interfaces</option>'
                + '<option value="logistics">Logistics</option>'
                + '<option value="maps">Maps</option>'
                + '<option value="medical">Medical</option>'
                + '<option value="moving">Moving</option>'
                + '<option value="objects">Objects</option>'
                + '<option value="payments-shopping">Payment & Shopping</option>'
                + '<option value="shapes">Shapes</option>'
                + '<option value="spinners">Spinners</option>'
                + '<option value="sports">Sports</option>'
                + '<option value="status">Status</option>'
                + '<option value="users-people">Users & People</option>'
                + '<option value="vehicles">Vehicles</option>'
                + '<option value="writing">Writing</option>'
                + '</select><br><br>'
                + '<select name="iconStyle" id="iconStyle">'
                + '<option value="" disabled="true" selected>Choose a style...</option>'
                + '<option value="style-all">All Styles</option>'
                + '<option value="style-fas">Solid</option>'
                + '<option value="style-far">Regular</option>'
                + '<option value="style-fal">Light</option>'
                + '<option value="style-fab">Brands</option>'
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

            categoriesXML.open("GET", "../../../assets/json/facategories.json", true);
            categoriesXML.onload = function() {
                if (this.readyState == 4 && this.status == 200) {
                    categories = JSON.parse(this.responseText);
                }
            };
            categoriesXML.onerror = function(e) {
                console.log(this.statusText);
            };
            categoriesXML.send();

            iconsXML.open("GET", "../../../assets/json/faicons.json", true);
            iconsXML.onload = function(e) {
                if (this.readyState == 4 && this.status == 200) {
                    icons = JSON.parse(this.responseText);
                    printIcons(icons);
                }
            };
            iconsXML.onerror = function(e) {
                console.log(this.statusText);
            };
            iconsXML.send();

            this.modal.addTemplate('creativeorangeFontAwesome', this.creativeorangeFontAwesome.getTemplate());
            this.modal.load('creativeorangeFontAwesome', 'Font awesome icons', 800);

            var iconOptions = [];
            var iconsLength = 0;

            function printIcons(icons) {
                iconsLength = icons.length;
                for (var icon in icons) {
                    if (icons.hasOwnProperty(icon)){
                        var iconCategories = '';
                        var iconName = icon;
                        var iconLabel = icons[icon].label;

                        //Get the icon categories.
                        for (var category in categories) {
                            if (categories.hasOwnProperty(category)) {
                                for (var i = 0; i < categories[category].icons.length; i++) {
                                    if (icon === categories[category].icons[i]) {
                                        iconCategories += category + " ";
                                    }
                                }
                            }
                        }

                        //Get the icon styles.
                        for (var style in icons[icon].styles) {
                            if (icons[icon].styles.hasOwnProperty(style)) {
                                if (icons[icon].styles[style] === "brands") {
                                    createIcon(iconCategories, "fab", iconName, (iconLabel));
                                } else if (icons[icon].styles[style] === "solid") {
                                    createIcon(iconCategories, "fas", iconName, (iconLabel));
                                } else if (icons[icon].styles[style] === "regular") {
                                    createIcon(iconCategories, "far", iconName, (iconLabel));
                                } else if (icons[icon].styles[style] === "light") {
                                    createIcon(iconCategories, "fal", iconName, (iconLabel));
                                }
                            }
                        }
                    };
                };

                //Print the icons.
                $(".iconContents").html(iconOptions.join(""));

                //Control icon selections.
                $(".iconContents div").on('click', function () {
                    $(".iconContents div").removeClass('active');
                    $(this).addClass('active');
                });
            }

            function createIcon(category, style, name, label) {
                iconOptions.push('<div><i class="' + style + " fa-" + name + '" id="redactor-fa-' + name + '"></i>'
                    + '<br>'
                    + '<span class="' + category + " style-" + style + '">' + label + '</span>'
                    + '<input type="hidden" name="final-icon" value="' + style + " fa-" + name + '"></div>');
            }


            //Load and select colours.
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


            //Process user requests.
            var savebutton = this.modal.getActionButton('Insert');
            savebutton.on('click', this.creativeorangeFontAwesome.insert);

            this.selection.save();
            this.modal.show();

            // Filter icons by category.
            $('#iconCategory').change(function () {
                var valCategory = $(this).val();
                if (valCategory === 'category-all') {
                    $('.iconContents>div>span').each(function () {
                        $(this).parent().show();
                    });
                } else {
                    $('.iconContents>div>span').each(function () {
                        var text = $(this).attr('class');
                        (text.indexOf(valCategory) >= 0) ? $(this).parent().show() : $(this).parent().hide();
                    });
                }
            });

            // Filter icons by style.
            $('#iconStyle').change(function () {
                var valStyle = $(this).val();
                if (valStyle === 'style-all') {
                    $('.iconContents>div>span').each(function () {
                        $(this).parent().show();
                    });
                } else {
                    $('.iconContents>div>span').each(function () {
                        var text = $(this).attr('class');
                        (text.indexOf(valStyle) >= 0) ? $(this).parent().show() : $(this).parent().hide();
                    });
                }
            });

            // Filter icons by search
            $('#iconSearchBox').keyup(function () {
                var valSearch = $(this).val().toLowerCase();
                $('.iconContents>div>span').each(function () {
                    var text = $(this).text().toLowerCase();
                    (text.indexOf(valSearch) === 0) ? $(this).parent().show() : $(this).parent().hide();
                });
            });

        },
        insert: function () {
            var str = $(".iconContents div.active input").val();

            //Load and select colours.
            var chosenCol = $("#selCol").val();
            if (chosenCol === "Default") {
                chosenCol = '';
            }

            this.modal.close();
            this.selection.restore();

            var node = $('<span />').html('<i class="' + str + ' ' + chosenCol + '"></i>', false);

            this.insert.node(node);
            this.code.sync();
        }

    };
};