if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.creativeorangeFontAwesome = function () {
    return {
        init: function () {
            var button = this.button.add('creativeorangeFontAwesome', 'Font Awesome icons');
            this.button.addCallback(button, this.creativeorangeFontAwesome.show);
            this.button.setIcon(button, '<i class="fa fa-smile-o"</i>');
        },
        getTemplate: function (modal, len, icons) {
            return String()
                + '<section id="redactor-modal-advanced">'
                + '<div class="iconFilterStyle"><p>Choose a theme and style or search for an icon:</p>'
                + '<select name="iconTheme" id="iconStyle">'
                + '<option value="all">All (2,707 icons)</option>'
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
                + '</select>'
                + '<select name="iconTheme" id="iconStyle">'
                + '<option value="all">All</option>'
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
            // Load and select the icons.
            var accessibility = ['fab fa-accessible-icon', 'fas fa-american-sign-language-interpreting', 'fas fa-assistive-listening-systems', 'fas fa-audio-description', 'fas fa-blind', 'fas fa-braille', 'fas fa-closed-captioning', 'far fa-closed-captioning', 'fas fa-deaf', 'fas fa-low-vision', 'fas fa-phone-volume', 'fas fa-question-circle', 'far fa-question-circle', 'fas fa-sign-language', 'fas fa-tty', 'fas fa-universal-access', 'fas fa-wheelchair',];
            var arrows = [];
            var audiovideo = [];
            var business = [];
            var charity = [];
            var chat = [];
            var chess = [];
            var code = [];
            var communication = [];
            var computers = [];
            var currency = [];
            var datetime = [];
            var design = [];
            var editors = [];
            var files = [];
            var genders = [];
            var hands = [];
            var health = [];
            var images = [];
            var interfaces = [];
            var logistics = [];
            var maps = [];
            var medical = [];
            var moving = [];
            var iobjects = [];
            var payments = [];
            var shapes = [];
            var spinners = [];
            var sports = [];
            var istatus = [];
            var people = [];
            var vehicles = [];
            var writing = [];
            var all = accessibility.concat(arrows, audiovideo, business, charity, chat, chess, code, communication, computers, currency, datetime, design, editors, files, genders, hands, health, images, interfaces, logistics, maps, medical, moving, iobjects, payments, shapes, spinners, sports, istatus, people, vehicles, writing)

            // var icons = ['rub', 'ruble', 'rouble', 'pagelines', 'stack-exchange', 'arrow-circle-o-right', 'arrow-circle-o-left', 'caret-square-o-left', 'toggle-left', 'dot-circle-o', 'wheelchair', 'vimeo-square', 'try', 'turkish-lira', 'plus-square-o', 'adjust', 'anchor', 'archive', 'arrows', 'arrows-h', 'arrows-v', 'asterisk', 'ban', 'bar-chart-o', 'barcode', 'bars', 'beer', 'bell', 'bell-o', 'bolt', 'book', 'bookmark', 'bookmark-o', 'briefcase', 'bug', 'building-o', 'bullhorn', 'bullseye', 'calendar', 'calendar-o', 'camera', 'camera-retro', 'caret-square-o-down', 'caret-square-o-left', 'caret-square-o-right', 'caret-square-o-up', 'certificate', 'check', 'check-circle', 'check-circle-o', 'check-square', 'check-square-o', 'circle', 'circle-o', 'clock-o', 'cloud', 'cloud-download', 'cloud-upload', 'code', 'code-fork', 'coffee', 'cog', 'cogs', 'comment', 'comment-o', 'comments', 'comments-o', 'compass', 'credit-card', 'crop', 'crosshairs', 'cutlery', 'dashboard', 'desktop', 'dot-circle-o', 'download', 'edit', 'ellipsis-h', 'ellipsis-v', 'envelope', 'envelope-o', 'eraser', 'exchange', 'exclamation', 'exclamation-circle', 'exclamation-triangle', 'external-link', 'external-link-square', 'eye', 'eye-slash', 'female', 'fighter-jet', 'film', 'filter', 'fire', 'fire-extinguisher', 'flag', 'flag-checkered', 'flag-o', 'flash', 'flask', 'folder', 'folder-o', 'folder-open', 'folder-open-o', 'frown-o', 'gamepad', 'gavel', 'gear', 'gears', 'gift', 'glass', 'globe', 'group', 'hdd-o', 'headphones', 'heart', 'heart-o', 'home', 'inbox', 'info', 'info-circle', 'key', 'keyboard-o', 'laptop', 'leaf', 'legal', 'lemon-o', 'level-down', 'level-up', 'lightbulb-o', 'location-arrow', 'lock', 'magic', 'magnet', 'mail-forward', 'mail-reply', 'mail-reply-all', 'male', 'map-marker', 'meh-o', 'microphone', 'microphone-slash', 'minus', 'minus-circle', 'minus-square', 'minus-square-o', 'mobile', 'mobile-phone', 'money', 'moon-o', 'music', 'pencil', 'pencil-square', 'pencil-square-o', 'phone', 'phone-square', 'picture-o', 'plane', 'plus', 'plus-circle', 'plus-square', 'plus-square-o', 'power-off', 'print', 'puzzle-piece', 'qrcode', 'question', 'question-circle', 'quote-left', 'quote-right', 'random', 'refresh', 'reply', 'reply-all', 'retweet', 'road', 'rocket', 'rss', 'rss-square', 'search', 'search-minus', 'search-plus', 'share', 'share-square', 'share-square-o', 'shield', 'shopping-cart', 'sign-in', 'sign-out', 'signal', 'sitemap', 'smile-o', 'sort', 'sort-alpha-asc', 'sort-alpha-desc', 'sort-amount-asc', 'sort-amount-desc', 'sort-asc', 'sort-desc', 'sort-down', 'sort-numeric-asc', 'sort-numeric-desc', 'sort-up', 'spinner', 'square', 'square-o', 'star', 'star-half', 'star-half-empty', 'star-half-full', 'star-half-o', 'star-o', 'subscript', 'suitcase', 'sun-o', 'superscript', 'tablet', 'tachometer', 'tag', 'tags', 'tasks', 'terminal', 'thumb-tack', 'thumbs-down', 'thumbs-o-down', 'thumbs-o-up', 'thumbs-up', 'ticket', 'times', 'times-circle', 'times-circle-o', 'tint', 'toggle-down', 'toggle-left', 'toggle-right', 'toggle-up', 'trash-o', 'trophy', 'truck', 'umbrella', 'unlock', 'unlock-alt', 'unsorted', 'upload', 'user', 'users', 'video-camera', 'volume-down', 'volume-off', 'volume-up', 'warning', 'wheelchair', 'wrench', 'check-square', 'check-square-o', 'circle', 'circle-o', 'dot-circle-o', 'minus-square', 'minus-square-o', 'plus-square', 'plus-square-o', 'square', 'square-o', 'bitcoin', 'btc', 'cny', 'dollar', 'eur', 'euro', 'gbp', 'inr', 'jpy', 'krw', 'money', 'rmb', 'rouble', 'rub', 'ruble', 'rupee', 'try', 'turkish-lira', 'usd', 'won', 'yen', 'align-center', 'align-justify', 'align-left', 'align-right', 'bold', 'chain', 'chain-broken', 'clipboard', 'columns', 'copy', 'cut', 'dedent', 'eraser', 'file', 'file-o', 'file-text', 'file-text-o', 'files-o', 'floppy-o', 'font', 'indent', 'italic', 'link', 'list', 'list-alt', 'list-ol', 'list-ul', 'outdent', 'paperclip', 'paste', 'repeat', 'rotate-left', 'rotate-right', 'save', 'scissors', 'strikethrough', 'table', 'text-height', 'text-width', 'th', 'th-large', 'th-list', 'underline', 'undo', 'unlink', 'angle-double-down', 'angle-double-left', 'angle-double-right', 'angle-double-up', 'angle-down', 'angle-left', 'angle-right', 'angle-up', 'arrow-circle-down', 'arrow-circle-left', 'arrow-circle-o-down', 'arrow-circle-o-left', 'arrow-circle-o-right', 'arrow-circle-o-up', 'arrow-circle-right', 'arrow-circle-up', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up', 'arrows', 'arrows-alt', 'arrows-h', 'arrows-v', 'caret-down', 'caret-left', 'caret-right', 'caret-square-o-down', 'caret-square-o-left', 'caret-square-o-right', 'caret-square-o-up', 'caret-up', 'chevron-circle-down', 'chevron-circle-left', 'chevron-circle-right', 'chevron-circle-up', 'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up', 'hand-o-down', 'hand-o-left', 'hand-o-right', 'hand-o-up', 'long-arrow-down', 'long-arrow-left', 'long-arrow-right', 'long-arrow-up', 'toggle-down', 'toggle-left', 'toggle-right', 'toggle-up', 'arrows-alt', 'backward', 'compress', 'eject', 'expand', 'fast-backward', 'fast-forward', 'forward', 'pause', 'play', 'play-circle', 'play-circle-o', 'step-backward', 'step-forward', 'stop', 'youtube-play', 'adn', 'android', 'apple', 'bitbucket', 'bitbucket-square', 'bitcoin', 'btc', 'css3', 'dribbble', 'dropbox', 'facebook', 'facebook-square', 'flickr', 'foursquare', 'github', 'github-alt', 'github-square', 'gittip', 'google-plus', 'google-plus-square', 'html5', 'instagram', 'linkedin', 'linkedin-square', 'linux', 'maxcdn', 'pagelines', 'pinterest', 'pinterest-square', 'renren', 'skype', 'stack-exchange', 'stack-overflow', 'trello', 'tumblr', 'tumblr-square', 'twitter', 'twitter-square', 'vimeo-square', 'vk', 'weibo', 'windows', 'xing', 'xing-square', 'youtube', 'youtube-play', 'youtube-square', 'ambulance', 'h-square', 'hospital-o', 'medkit', 'plus-square', 'stethoscope', 'user-md', 'wheelchair'];
            var icons = all;

            var len = icons.length;

            this.modal.addTemplate('creativeorangeFontAwesome', this.creativeorangeFontAwesome.getTemplate(len, icons));
            this.modal.load('creativeorangeFontAwesome', 'Font awesome icons', 800);
            //this.modal.createCancelButton();


            var lencount = icons.length;

            var blkstr = [];
            for (var z = 0; z < lencount; z++) {
                var icon = icons[z];
                //console.log(icon);

                // var listcons = $('<i class="' + icon + '" id="redactor-fa-' + icon + '"><span>' + icon + '</span></i>');
                blkstr.push('<div><i class="' + icons[z] + '" id="redactor-fa-' + icons[z] + '"></i><br><span>' + icons[z] + '</span></div>');

            }

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