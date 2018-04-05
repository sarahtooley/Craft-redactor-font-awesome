if (!RedactorPlugins) { var RedactorPlugins = {}; }

RedactorPlugins.creativeorangeFontAwesome = function () {
    "use strict";
    return {
        init: function () {
            var button = this.button.add("creativeorangeFontAwesome", "Font Awesome Icons");
            this.button.addCallback(button, this.creativeorangeFontAwesome.show);
            this.button.setIcon(button, "<i class='far fa-smile'</i>");
        },
        getTemplate: function () {
            return String()
                + "<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.0.9/css/all.css' integrity='sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1' crossorigin='anonymous'>\n"
                + "<section id='redactor-modal-advanced'>"
                + "<div><p>Choose a category and style or search for individual icons:</p>"
                + "<select name='iconCategory' id='iconCategory'>"
                + "<option value='' disabled='true' selected>Choose a category...</option>"
                + "<option value='category-all'>All Categories</option>"
                + "<option value='accessibility'>Accessibility</option>"
                + "<option value='arrows'>Arrows</option>"
                + "<option value='audio-video'>Audio & Video</option>"
                + "<option value='business'>Business</option>"
                + "<option value='charity'>Charity</option>"
                + "<option value='chat'>Chat</option>"
                + "<option value='chess'>Chess</option>"
                + "<option value='code'>Code</option>"
                + "<option value='communication'>Communication</option>"
                + "<option value='computers'>Computers</option>"
                + "<option value='currency'>Currency</option>"
                + "<option value='date-time'>Date & Time</option>"
                + "<option value='design'>Design</option>"
                + "<option value='editors'>Editors</option>"
                + "<option value='files'>Files</option>"
                + "<option value='gender'>Genders</option>"
                + "<option value='hands'>Hands</option>"
                + "<option value='health'>Health</option>"
                + "<option value='images'>Images</option>"
                + "<option value='interfaces'>Interfaces</option>"
                + "<option value='logistics'>Logistics</option>"
                + "<option value='maps'>Maps</option>"
                + "<option value='medical'>Medical</option>"
                + "<option value='moving'>Moving</option>"
                + "<option value='objects'>Objects</option>"
                + "<option value='payments-shopping'>Payment & Shopping</option>"
                + "<option value='shapes'>Shapes</option>"
                + "<option value='spinners'>Spinners</option>"
                + "<option value='sports'>Sports</option>"
                + "<option value='status'>Status</option>"
                + "<option value='users-people'>Users & People</option>"
                + "<option value='vehicles'>Vehicles</option>"
                + "<option value='writing'>Writing</option>"
                + "</select><br><br>"
                + "<select name='iconStyle' id='iconStyle'>"
                + "<option value='' disabled='true' selected>Choose a style...</option>"
                + "<option value='style-all'>All Styles</option>"
                + "<option value='style-fas'>Solid</option>"
                + "<option value='style-far'>Regular</option>"
                + "<option value='style-fal'>Light</option>"
                + "<option value='style-fab'>Brands</option>"
                + "</select>"
                + "</div><hr>"
                + "<div class='iconFilterInput'><input placeholder='Search for icons' id='iconSearchBox' type='text' /></div>"
                + "<div id='iconContents' class='iconContents'></div>"
                + "<div class='colourContents'><p id='sampleColour'><i class='fa fa-square'></i></p></div>"
                + "</section>"
                + "<section style='margin-bottom: 10px;'>"
                + "<button id='redactor-modal-button-action'>Insert</button>"
                + "<button id='redactor-modal-button-cancel'>Cancel</button>"
                + "</section>";
        },
        show: function () {
            var icons = null;
            var iconsXML = new XMLHttpRequest();
            var iconOptions = [];

            var categories = null;
            var categoriesXML = new XMLHttpRequest();
            var chosenCategory = null;
            var chosenStyle = null;

            var colours = ["default", "white-color", "light-color", "light-blue-color", "aqua-color", "dark-blue-color", "red-color", "teal-color", "orange-color"];
            var lenCol = colours.length;
            var selCol = $("<select></select>").attr("id", "selCol").attr("name", "selCol");

            /**
             * Create the html for all icons and add an active class to an icon if selected.
             * @param icons
             */
            function printIcons(icons) {
                for (var icon in icons) {
                    if (icons.hasOwnProperty(icon)) {
                        var iconCategories = "";
                        var iconName = icon;
                        var iconLabel = icons[icon].label;

                        for (var category in categories) {
                            if (categories.hasOwnProperty(category)) {
                                for (var i = 0; i < categories[category].icons.length; i++) {
                                    if (icon === categories[category].icons[i]) {
                                        iconCategories += category + " ";
                                    }
                                }
                            }
                        }

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
                    }
                }

                $(".iconContents").html(iconOptions.join(""));

                $(".iconContents div").on("click", function () {
                    $(".iconContents div").removeClass("active");
                    $(this).addClass("active");
                });
            }

            /**
             * Generate the html for each icon with category, style, and name used for classes, and the label as displayed text.
             * @param category
             * @param style
             * @param name
             * @param label
             */
            function createIcon(category, style, name, label) {
                iconOptions.push("<div><i class='" + style + " fa-" + name + "' id='redactor-fa-" + name + "'></i>"
                    + "<br>"
                    + "<span class='" + category + " style-" + style + "'>" + label + "</span></div>");
            }


            /**
             * Retrieve and parse the category JSON.
             */
            categoriesXML.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    categories = JSON.parse(this.responseText);
                }
            };
            categoriesXML.onerror = function () {
                console.log(this.statusText);
            };
            categoriesXML.open("GET", "../../../assets/json/facategories.json", true);
            categoriesXML.send();

            /**
             * Retrieve and parse the icon JSON.
             */
            iconsXML.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    icons = JSON.parse(this.responseText);
                    printIcons(icons);
                }
            };
            iconsXML.onerror = function () {
                console.log(this.statusText);
            };
            iconsXML.open("GET", "../../../assets/json/faicons.json", true);
            iconsXML.send();

            this.modal.addTemplate("creativeorangeFontAwesome", this.creativeorangeFontAwesome.getTemplate());
            this.modal.load("creativeorangeFontAwesome", "Font Awesome 5 Icons", 800);

            /**
             * Filter icons by category (and style if applicable).
             */
            $("#iconCategory").change(function () {
                $("#iconSearchBox").val("");
                chosenCategory = $(this).val();
                if (chosenCategory === "category-all") {
                    chosenCategory = null;
                    if (chosenStyle !== null) {
                        filterIcons(chosenStyle, null);
                    } else {
                        filterIcons(null, null);
                    }
                } else {
                    if (chosenStyle !== null) {
                        filterIcons(chosenCategory, chosenStyle)
                    } else {
                        filterIcons(chosenCategory, null)
                    }
                }
            });

            /**
             * Filter icons by style (and category if applicable).
             */
            $("#iconStyle").change(function () {
                $("#iconSearchBox").val("");
                chosenStyle = $(this).val();
                if (chosenStyle === "style-all") {
                    chosenStyle = null;
                    if (chosenCategory !== null) {
                        filterIcons(chosenCategory, null);
                    } else {
                        filterIcons(null, null);
                    }
                } else {
                    if (chosenCategory !== null) {
                        filterIcons(chosenStyle, chosenCategory)
                    } else {
                        filterIcons(chosenStyle, null)
                    }
                }
            });

            /**
             * Filter icons using 0 to 2 parameters. Associated with category and style.
             * @param filterA
             * @param filterB
             */
            function filterIcons(filterA, filterB) {
                if (filterA === null && filterB === null) {
                    $(".iconContents>div>span").each(function () {
                        $(this).parent().show();
                    });
                } else if (filterB === null) {
                    $(".iconContents>div>span").each(function () {
                        var text = $(this).attr("class");
                        (text.indexOf(filterA) >= 0) ? $(this).parent().show() : $(this).parent().hide();
                    });
                } else {
                    $(".iconContents>div>span").each(function () {
                        var text = $(this).attr("class");
                        (text.indexOf(filterA) >= 0 && text.indexOf(filterB) >= 0) ? $(this).parent().show() : $(this).parent().hide();
                    });
                }
            }

            /**
             * Filter icons by search and reset category/style select options.
             */
            $("#iconSearchBox").keyup(function () {
                var valSearch = $(this).val().toLowerCase();
                $(".iconContents>div>span").each(function () {
                    var text = $(this).text().toLowerCase();
                    (text.indexOf(valSearch) === 0) ? $(this).parent().show() : $(this).parent().hide();
                });
                if (chosenCategory !== null || chosenStyle !== null) {
                    chosenCategory = null;
                    chosenStyle = null;
                    $("#iconCategory").val("category-all");
                    $("#iconStyle").val("style-all");
                }
            });

            //Load and select colours. Colours added here should match css class names under fontAwesome.css and in your public assets.
            for (var z = 0; z < lenCol; z++) {
                var colour = colours[z];
                selCol.append("<option value='" + colour + "'>" + colour + "</option>");
            }

            $(".colourContents").append(selCol);

            $("#selCol").change(function () {
                $("#sampleColour").removeClass().addClass($(this).val());
            });

            this.modal.getActionButton("Insert").on("click", this.creativeorangeFontAwesome.insert);
            this.selection.save();
            this.modal.show();
        },
        insert: function () {
            var chosenIcon = $(".iconContents div.active i").attr("class");
            var chosenColour = (($("#selCol").val() === "Default") ? "" : $("#selCol").val());
            var node = $("<span />").html("<i class='" + chosenIcon + " " + chosenColour + "'></i>", false);

            this.modal.close();
            this.selection.restore();
            this.insert.node(node);
            this.code.sync();
        }
    };
};