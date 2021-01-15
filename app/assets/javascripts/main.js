"use strict";
$(document).on('turbolinks:load', function() {

    var relative_url = "/erasmus";

    var lang_elements = [
        {key: "name", label: "Language", input: "select"},
        {key: "currently_studying", label: "Currently Studying", input: "checkbox"},
        {key: "able_follow_lectures", label: "Able to follow lectures", input: "checkbox"},
        {key: "able_follow_lectures_extra_preparation", label: "Able to follow lectures with extra preparation", input: "checkbox"},
    ];
    var work_elements = [
        {key: "work_kind", label: "Position", input: "text"},
        {key: "firm_organisation", label: "Organisation", input: "text"},
        {key: "from", label: "From", input: "date"},
        {key: "to", label: "To", input: "date"},
        {key: "country", label: "Country", input: "select"}
    ];

    /**
     * Additional fields for students with working experience
     **/
    $('#seekingDegreeCheckbox').click(
        function(e) {
            $('#degree-seeking').toggleClass('hidden');
        }
    );

    /**
     * Additional fields for double-degree seeking students
     **/
    $('#no_work_experience_checkbox').click(
        function(e) {
            if (!$('.other-work ').hasClass('hidden')) {
                $('.work-list ').empty();
            }
            $('.other-work ').toggleClass('hidden');
        }
    );


    /**
     * Close flash message
     **/
    $('.flash-message').click(
        function(e) {
            $(this).toggleClass('hidden');
        }
    );

    /**
     * Remove flash messages automatically
     */
    setTimeout(function(e){
        $('.flash-message').addClass('hidden');
    }, 4000);

    /**
     * Initialize cropper
     **/
    function initCropper(){
        var $image = $('#edit-picture-dialog-picture');
        if ($image.attr('src') !== relative_url + "/assets/placeholder.png") {
            $image.cropper({
                aspectRatio: 1,
                minContainerWidth: 150,
                maxContainerWidth: 250,
                minContainerHeight: 150,
                maxContainerHeight: 250,
                // minCanvasWidth: 250,
                // minCanvasHeight: 250,
                minCropBoxWidth: 150,
                maxCropBoxWidth: 150,
                minCropBoxHeight: 150,
                maxCropBoxHeight: 150,
                background: false,
                guides: false,
                crop: function(event) {
                }
            });
        }
    }

    /**
     * Open picture modal
     **/
    $('.edit-picture').click(
        function(e) {
            var availWidth = $('html').width();
            availWidth = availWidth > 900 ? 700 : (availWidth < 500 ? availWidth - 10 : availWidth*0.7)
            var editPictureDialog = $('#edit-picture-dialog').dialog({
                modal:true,
                minWidth: availWidth,
                show: {
                    effect: "scale",
                    duration: 200
                },
                hide: {
                    effect: "explode",
                    duration: 200
                },
                open: function () {
                    $('.ui-widget-overlay').on('click', function () {
                        editPictureDialog.dialog('close');
                    });
                }
            });
            var $image = $('#edit-picture-dialog-picture');
            initCropper();

            // Get the Cropper.js instance after initialized
        });

    /**
     * Close picture modal
     */
    $('#edit-picture-dialog-close').click(
        function(e) {
            $('#edit-picture-dialog').dialog('close');
        }
    );

    /**
     * Open Degree Info modal
     **/
    $('.info-icon').click(
        function(e) {
            var availWidth = $('html').width();
            availWidth = availWidth > 900 ? 700 : (availWidth < 500 ? availWidth - 10 : availWidth * 0.7);
            var infoDialog = $('#info-degrees-dialog').dialog({
                modal:true,
                minWidth: availWidth,
                show: {
                    effect: "scale",
                    duration: 200
                },
                hide: {
                    effect: "explode",
                    duration: 200
                },
                open: function () {
                    $('.ui-widget-overlay').on('click', function () {
                        infoDialog.dialog('close');
                    });
                },
            });

        });


    /**
     * Close picture modal
     */
    $('#info-degrees-dialog-close').click(
        function(e) {
            $('#info-degrees-dialog').dialog('close');
        }
    );

    /**
     * Open multiple nominees modal
     */
    $('#multiple-nominees-button').click(function(e){
        e.stopPropagation();
        var availWidth = $('html').width();
        availWidth = availWidth > 900 ? 700 : (availWidth < 500 ? availWidth - 10 : availWidth*0.7)
        var nomineeDialog = $('#several-nominee-dialog').dialog({
            modal:true,
            minWidth: availWidth,
            show: {
                effect: "scale",
                duration: 200
            },
            hide: {
                effect: "explode",
                duration: 200
            },
            open: function () {
                $('.ui-widget-overlay').on('click', function () {
                    nomineeDialog.dialog('close');
                });
            },
        });

    });
    /**
     * Close multiple nominees modal
     */
    $('#several-nominee-dialog-close').click(
        function(e) {
            $('#several-nominee-dialog').dialog('close');
        }
    );

    /**
     * Delete user modal
     */
    $('#delete-user').click(function(e){
        e.stopPropagation();
        var availWidth = $('html').width();
        availWidth = availWidth > 900 ? 700 : (availWidth < 500 ? availWidth - 10 : availWidth*0.7)
        var deleteUserDialog = $('#delete-user-dialog').dialog({
            modal:true,
            minWidth: availWidth,
            show: {
                effect: "scale",
                duration: 200
            },
            hide: {
                effect: "explode",
                duration: 200
            },
            open: function () {
                $('.ui-widget-overlay').on('click', function () {
                    deleteUserDialog.dialog('close');
                });
            },
        });

    });

    $('#delete-user-dialog-close').click(
        function(e) {
            $('#delete-user-dialog').dialog('close');
        }
    );



    /**
     * Convert Base64 to Blob
     */
    function dataURItoBlob(dataURI) {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }

    /**
     * Generate cropped picture
     */
    $('#edit-picture-dialog form').submit(function() {
        var $image = $('#edit-picture-dialog-picture');
        var cropper = $image.data('cropper');
        var canvas = cropper.getCroppedCanvas({width: 150, height: 150})
        if (!canvas) {
            $('.messages-from-server').append($('<p class="message-from-server alert">An error ocurred</p>'));
            return false;
        }
        var canvasr = canvas.toDataURL();
        var oData = new FormData();
        var photo = dataURItoBlob(canvasr);
        oData.append("user[photo]", photo, "photo.png");
        oData.append("authenticity_token", $('#edit-picture-dialog form input[name="authenticity_token"]').val());

        var oReq = new XMLHttpRequest();
        oReq.open("POST", relative_url+"/user/file_upload_ajax");
        oReq.send(oData)
        $('#spinner').removeClass('hidden');
        $('.messages-from-server').empty();
        oReq.onload = function(oEvent) {

            $('#spinner').addClass('hidden');
            if (oReq.status == 200) {
                try {
                    var url = JSON.parse(oReq.response).url;
                    var $image = $('#edit-picture-dialog-picture');
                    $image.attr('src', url);
                    $image.cropper('destroy')
                    initCropper();
                    $('#actual-picture').attr('src', url);
                    // $('.messages-from-server').append($('<p class="message-from-server notice">Uploaded correctly!</p>'));
                    $('#edit-picture-dialog').dialog('close');
                    location.reload();
                } catch (e) {
                    console.error("An error ocurred when uploading the file", e)
                    $('.messages-from-server').append($('<p class="message-from-server alert">An error ocurred</p>'));
                }
            } else {
                console.error("Error " + oReq.status + " occurred when trying to upload your file.");
                $('.messages-from-server').append($('<p class="alert">An error ocurred</p>'));
            }
        };
        return false;
    });

    /**
     * Load a new picture to be cropped
     */
    $(".image-edit-actions .input-file").change(function(e){
        if (e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (ev) {
                var $image = $('#edit-picture-dialog-picture');
                $image.attr('src', ev.target.result);
                $image.cropper('destroy')
                initCropper();
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    /**
     * Send Learning Agreement Subjects
     */

     var unsaved = false;

     $(document).on("change","#la-form input", function(){
         unsaved = true;
     });

     function unloadPage(){ 
         if(unsaved){
             return "You might have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
         }
     }

     window.onbeforeunload = unloadPage;
     window.addEventListener("turbolinks:before-render", unloadPage);


     var dispatchUnloadEvent = function() {
       var event = document.createEvent("Events")
       event.initEvent("turbolinks:unload", true, false)
       document.dispatchEvent(event)
     }

     addEventListener("beforeunload", dispatchUnloadEvent)
     addEventListener("turbolinks:before-render", dispatchUnloadEvent)

    $('#la-form').submit(function() {
        var oData = new FormData(document.getElementById("la-form"));
        oData.append("authenticity_token", $('#la-form input[name="authenticity_token"]').val());
        var oReq = new XMLHttpRequest();
        oReq.open("POST", relative_url+"/user/submit_la");
        oReq.send(oData)
        /*$('.messages-from-server').empty();*/
        $('#la-server-msg').text("Saving...")
        oReq.onload = function(oEvent) {
            if (oReq.status == 200) {
                try {
                    $('#la-server-msg').text("Saved!");
                    unsaved = false;
                    setTimeout(function(){
                        $('#la-server-msg').text("");
                    }, 10000);
                } catch (e) {
                    console.error("An error ocurred when uploading the file", e)
                    // $('.messages-from-server').append($('<p class="message-from-server alert">An error ocurred</p>'));
                    $('#la-server-msg').text("An error ocurred")
                }
            } else {
                console.error("Error " + oReq.status + " occurred when trying to upload your file.");
                $('#la-server-msg').text("An error ocurred")
            }

        };
        return false;
        //  return true;
    });

    /**
     * Change ECTS callback
     */
    function ectsChange(e){
        var total = 0;
        $('input.la-ects').each(function(a,b){
            total += b.value && !isNaN(parseFloat(b.value)) ? parseFloat(b.value) : 0;
        });
        total = Math.round(total * 100) / 100;
        $('#total-ects').text(total);
    }

    /**
     * Autocomplete Argument for subject selection by name
     * @param degree
     */

    var subjectAutoComplete = function(degree){
        var callback = function(e, term){
            var item = term.item;
            if (item) {
                $(this).prev().prev().val(item.degree);
                $(this).autocomplete(subjectAutoComplete(item.degree)).autocomplete( "instance" )._renderItem = renderFunction;
                $(this).next().val(item.ects || 0);
                $(this).prev().val(item.code || 0);
                ectsChange();
            }
        };
        return {
            source: data
                .filter(function(d){
                    return !degree || d.degree === degree
                })
                .map(function(subject){
                    return {
                        label: subject.name + " / " + subject.nombre + " ("+ subject.acron +") " + subject.code,
                        value: subject.name || subject.nombre || subject.acron ,
                        ects: subject.ects,
                        code: subject.code,
                        acron: subject.acron,
                        name: subject.name,
                        nombre: subject.nombre,
                        degree: subject.degree
                    }
                }),
            minLength: 0,
            delay: 0,
            change: callback,
            select: callback
        }
    };
    /**
     * Autocomplete Argument for subject selection by code
     * @param degree
     */
    var codeAutoComplete = function(degree){
        var callback = function(e, term){
            var item = term.item;
            if (item) {
                $(this).prev().val(item.degree);
                $(this).autocomplete(codeAutoComplete(item.degree)).autocomplete( "instance" )._renderItem = renderFunction;
                $(this).next().val(item.name || item.nombre || item.acron);
                $(this).next().next().val(item.ects || 0);
                ectsChange();
            }

        };
        return {
            source: data
                .filter(function(d){return !degree || d.degree === degree})
                .map(function(subject){
                    return {
                        label: subject.name + " ("+ subject.acron+") " + subject.code,
                        acron: subject.acron,
                        value: subject.code,
                        ects: subject.ects,
                        name: subject.name,
                        nombre: subject.nombre,
                        degree: subject.degree
                    }
                }),
            minLength: 0,
            delay: 0,
            change: callback,
            select: callback

        };
    };

    /**
     * Learning agreement subject list render function
     *
     */

    var getDegreeFullName = function(initials) {
        var list = {
            "GITST": "Grado en Ingeniería de Tecnologías y Servicios de Telecomunicación ",
            "GIB": "Grado en Ingeniería Biomédica",
            "GISD": "Grado en Ingeniería y Sistemas de Datos",
            "MUIT": "Máster Universitario en Ingeniería de Telecomunicación",
            "MUIB": "Máster Universitario en Ingeniería Biomédica",
            "MUSTC": "Master of Science in Signal Theory and Communications",
            "MUCS": "Máster Universitario en Ciberseguridad",
            "MUESFV": "Máster Universitario en Energía Solar Fotovoltaica",
            "MUISE": "Máster Universitario en Ingeniería de Sistemas Electrónicos",
            "MUIRST": "Máster Universitario en Ingeniería de Redes y Servicios Telemáticos ",
            "MUTECI": "Máster Universitario en Tratamiento Estadístico-Computacional de la Información",
            "MUIF": "Máster Universitario en Ingeniería Fotónica"
        };
        if (list[initials]) {
            return list[initials] + " (" + initials + ")";
        }
        return  initials || "Other";
    };

    var renderFunction = function( ul, item ) {
        return $( "<li>" )
            .append( "<div>" +
                (item.name ? ("<b>" + item.name + "</b>" + (item.acron ? " ("+item.acron+")" : "") + "<br>") : "") +
                (item.nombre ? (item.name ? "" : "<b>") + (item.nombre + (item.name ? "" : ( "</b>" + (item.acron ? " ("+item.acron+")" : ""))) + "<br>"):"" ) +
                (item.ects ? "<span style='color: grey;'>" + item.ects + " ECTS" + "</span>" : "") +
                (item.degree ? "<br><span style='color: #4664A2;'>" + getDegreeFullName(item.degree) + "</span></div>" : ""))
            .appendTo( ul );
    };

    /**
     * Callback for reapplying the autocomplete to subject and code fields when the degree has already been selected
     * @param e
     */
    var changeDegree = function(e){
        $(this).next().autocomplete(codeAutoComplete(e.target.value)).autocomplete( "instance" )._renderItem = renderFunction;
        $(this).next().next().autocomplete(subjectAutoComplete(e.target.value)).autocomplete( "instance" )._renderItem = renderFunction;
    };

    $('.la-degree').on("change", changeDegree);

    /**
     * Delete subject from Learning Agreement
     * @param e
     */
    var deleteLaButtonCallback = function(e){
        if($('.la-form-row').length > 1) {
            $(this).closest('.la-form-row').remove();

        } else {
            var $lastChild = $('.la-form-row:last-child');
            $lastChild.find(".la-code").autocomplete(codeAutoComplete()).autocomplete( "instance" )._renderItem = renderFunction;
            $lastChild.find(".la-name").autocomplete(subjectAutoComplete()).autocomplete( "instance" )._renderItem = renderFunction;
            $lastChild.find("input").val("");
            $lastChild.find("select").val("");
        }
        ectsChange(e);

    };
    $('.delete-la-button').click(deleteLaButtonCallback);

    /**
     * Add a new learning agreement subject
     */
    $('#add-la-subject').click(function(e){
        var transc = $('.learning-agreement-transcription');
        var clone = $('.la-form-row:last-child').clone();
        var input = clone.find("input");
        input.val("");
        var select = clone.find("select");
        select.val("");
        select.on("change",changeDegree);
        clone.attr("id", "la-subject-" + Date.now());
        clone.insertAfter('.la-form-row:last-child');
        $(input[0]).autocomplete(codeAutoComplete()).autocomplete( "instance" )._renderItem = renderFunction;
        $(input[1]).autocomplete(subjectAutoComplete()).autocomplete( "instance" )._renderItem = renderFunction;
        $(input[0]).data("ui-autocomplete")._trigger("change");
        $(input[1]).data("ui-autocomplete")._trigger("change");
        var deleteB = clone.find(".delete-la-button");
        deleteB.click(deleteLaButtonCallback);
    });

    /**
     * Add autocomplete to existing subjects
     */
    $(".la-subject-existing .la-name").each(function(i,e){
        var $e=$(e);
        var degree = $e.prev().prev().val();
        $e.autocomplete(subjectAutoComplete(degree)).autocomplete( "instance" )._renderItem = renderFunction;
    });
    var laName = $("#la-subject-new .la-name");
    if (laName && laName.length > 0) {
        laName.autocomplete(subjectAutoComplete()).autocomplete( "instance" )._renderItem = renderFunction;
    }
    $(".la-subject-existing .la-code").each(function(i,e){
        var $e=$(e);
        var degree = $e.prev().val();
        $e.autocomplete(codeAutoComplete(degree)).autocomplete( "instance" )._renderItem = renderFunction;
    });
    var laCode = $("#la-subject-new .la-code");
    if (laCode && laCode.length > 0) {
        $("#la-subject-new .la-code").autocomplete(codeAutoComplete()).autocomplete( "instance" )._renderItem = renderFunction;
    }
    var multiLa = $("#la-subject-new .la-name, #la-subject-new .la-code");
    if (multiLa && multiLa.length > 0){
        multiLa.data("ui-autocomplete")._trigger("change");
    }

    if (laName && laCode && laName.length > 0 && laCode.length > 0 && $(".la-subject-existing .la-name, .la-subject-existing .la-code").data("ui-autocomplete")) {
        $(".la-subject-existing .la-name, .la-subject-existing .la-code").data("ui-autocomplete")._trigger("change");
    }

    /**
     * Recalculate ECTS total
     */
    var $laECTS = $('input.la-ects');
    $laECTS.keyup(ectsChange);
    $laECTS.change(ectsChange);

    /**
     * Collapse panels
     */
    $('.dashboard-section').click(function(e) {
        var content= $(this).parents('.row').children('.collapsible');
        var wasOpen = content.hasClass('show');
        $('.collapsible.show').removeClass('show');
        var caret = $('.caret')
        caret.removeClass('reverse');
        caret.addClass('no-reverse');
        if (!wasOpen) {
            caret= $(this).find('.caret');
            content.toggleClass('show');
            caret.toggleClass('reverse');
            caret.toggleClass('no-reverse');
        }
    });

    /**
     * Delete language
     */
    function deleteLang() {
        $(this).parents('.lang').remove();
    }

    /**
     * Add callback to all delete buttons in language form
     */
    $('.delete-lang-button').click(deleteLang);

    /**
     * Add a new language
     */
    $('#add-lang').click(function(e){
        var numLang = $(".language-input").length;
        var $lang = $('<div class="lang"></div>');
        for (var i in lang_elements) {
            var element = lang_elements[i];
            var el = "student_application_form[languages][][" + element.key + "]";
            var $field = $('<div class="field"></div>');
            var $container = $('<div class="flex-container"></div>');
            var $label = $('<label/>').attr("for", el ).text(element.label);
            var $input = $('<input/>').attr('type', element.input)
                .attr('name',el)
                .attr('class', "language-input");
            if(element.input === 'select' && window.options) {
                $input = $('<select/>')
                    .attr('name',el)
                    .attr('required', 'required')
                    .attr('class', "language-input");

                var $option = $('<option/>')
                    .attr('value', "")
                    .attr('disabled', "disabled")
                    .attr('selected', "selected");

                for (var opt in window.options) {
                    $option = $('<option/>')
                        .attr('value', window.options[opt])
                        .text(window.options[opt]);
                    $input.append($option);
                }
            }

            if (element.input === "checkbox") {
                $label.attr("class", "checkBox");
                $container.append($input);
                $container.append($label);
            } else {
                $container.append($label);
                $container.append($input);
            }

            $field.append($container);
            $lang.append($field);

        }
        var $button = $('<button/>')
            .attr('type', "button")
            .attr('class', "delete-lang-button transparent-button small-button");
        $button.click(deleteLang);
        var $icon = $('<i/>')
            .attr('class', "mdi mdi-close");
        $button.append($icon);
        $lang.append($button);
        $('.lang-list').append($lang)

    });


    /**
     * Delete work
     */
    function deleteWork() {
        $(this).parents('.work').remove();
    }

    /**
     * Add callback to all delete buttons in work form
     */
    $('.delete-work-button').click(deleteWork);

    /**
     * Add a new work experience
     */
    $('#add-work').click(function(e){
        var $work = $('<div class="work"></div>');
        for (var i in work_elements) {
            var element = work_elements[i];
            var el = "student_application_form[work_experiences][]["+element.key+"]";
            var $field = $('<div class="field"></div>');
            var $container = $('<div class="flex-container"></div>');
            var $label = $('<label/>').attr("for", el ).text(element.label);
            var $input = $('<input/>').attr('type', element.input)
                .attr('name',el)
                .attr('class', "work-input")
                .attr('required', 'required') ;

            if(element.input === 'select' && window.options) {
                $input = $('<select/>')
                    .attr('name',el)
                    .attr('required', 'required')
                    .attr('class', "work-input");
                var $option = $('<option/>')
                    .attr('value', "")
                    .attr('disabled', "disabled")
                    .attr('selected', "selected");

                $input.append($option);
                for (var opt in window.options) {
                    $option = $('<option/>')
                        .attr('value', window.options[opt])
                        .text(window.options[opt]);
                    $input.append($option);
                }
            }
            $container.append($label);
            $container.append($input);

            $field.append($container);
            $work.append($field);

        }
        var $button = $('<button/>')
            .attr('type', "button")
            .attr('class', "delete-work-button transparent-button small-button");
        $button.click(deleteWork);
        var $icon = $('<i/>')
            .attr('class', "mdi mdi-close");
        $button.append($icon);
        $work.append($button);
        $('.work-list').append($work)
    });

    $('#already_study_abroad').click(function(){
        $('.already_study_abroad_dependent').toggleClass('hidden');
    });

    $('#user_signed_student_application_form').change(function(e){
        if (e.target.files.length > 0) {
            // quitar disabled
            $('#upload-signed').prop('disabled', false);
        } else {
            // poner disabled
            $('#upload-signed').prop('disabled', true);
        }
    });

    $('.deletion').submit(function(e){
        return confirm("Are you sure you want to delete this file?");
    });

    $('.purpose_stay #other').change(function() {
        var $otherPurpose = $('#student_application_form_other_purpose');
        if ($otherPurpose.attr('required')) {
            $otherPurpose.removeAttr('required');
        }
        else {
            $otherPurpose.attr('required','required');
        }
    });

    /**
     * Admin Settings modal
     */
    $('#admin-settings').click(function(e){
        var availWidth = $('html').width();
        availWidth = availWidth > 900 ? 700 : (availWidth < 500 ? availWidth - 10 : availWidth*0.7)
        var adminDialog = $('#admin-settings-dialog').dialog({
            modal:true,
            minWidth: availWidth,
            show: {
                effect: "scale",
                duration: 200
            },
            hide: {
                effect: "explode",
                duration: 200
            },
            open: function () {
                $('.ui-widget-overlay').on('click', function () {
                    adminDialog.dialog('close');
                });
            }
        });
    });

    /**
     * Close admin settings modal
     */
    $('#admin-settings-dialog-close').click(
        function(e) {
            $('#admin-settings-dialog').dialog('close');
        }
    );

    /**
     * Delete item from admin settings
     */

    $('.delete-settings-button').click(function(e){
        $(this).parent().remove();
    });

    /**
     * Add Mobility Programe to settings
     */
    $('#add_mobility_programmes').click(function(e){
        var $multiple = $('<div/>').attr("class","multiple-item-flex-container");
        var $input = $('<input/>').attr("type","text").attr("name","mobility_programmes[]").attr("required","required");
        var $button = $("<button/>").attr("class","delete-settings-button transparent-button small-button") ;
        var $i = $('<i/>').attr("class","mdi mdi-close");

        $button.click(function(e){
            $(this).parent().remove();
        });

        $button.append($i);
        $multiple.append($input);
        $multiple.append($button);
        $('#add_mobility_programmes_container').before($multiple);
    });

    /**
     * Add academic years available
     */
    $('#add_academic_years').click(function(e){
        var $multiple = $('<div/>').attr("class","multiple-item-flex-container") ;
        var $input = $('<input/>').attr("type","text").attr("name","academic_years[]").attr("required","required");
        var $button = $("<button/>").attr("class","delete-settings-button transparent-button small-button") ;
        var $i = $('<i/>').attr("class","mdi mdi-close");

        $button.click(function(e){
            $(this).parent().remove();
        });

        $button.append($i);
        $multiple.append($input);
        $multiple.append($button);
        $('#add_academic_years_container').before($multiple);
    });



    /**
     * CSV modal
     */
    $('#csv-dialog-button').click(function(e){
        var availWidth = $('html').width();
        availWidth = availWidth > 900 ? 700 : (availWidth < 500 ? availWidth - 10 : availWidth*0.7)
        var csvDialog = $('#csv-dialog').dialog({
            modal:true,
            minWidth: availWidth,
            show: {
                effect: "scale",
                duration: 200
            },
            hide: {
                effect: "explode",
                duration: 200
            },
            open: function () {
                $('.ui-widget-overlay').on('click', function () {
                    csvDialog.dialog('close');
                });
            },
        });
    });

    /**
     * Select All in CSV modal
     */
    $('#csv-dialog-select-all-button').click(function(e){
        $('#csv-dialog input').prop( "checked", true );
        $(this).hide();
        $('#csv-dialog-deselect-all-button').show();
    });

    /**
     * Deselect All in CSV modal
     */
    $('#csv-dialog-deselect-all-button').click(function(e){
        $('#csv-dialog input').prop( "checked", false  );
        $(this).hide();
        $('#csv-dialog-select-all-button').show();

    });


    /**
     * Close CSV modal
     */
    $('#csv-dialog-close').click(
        function(e) {
            $('#csv-dialog').dialog('close');
        }
    );


    /**
     * Generate Acceptance Letter Modal
     */
    $('#acceptance-letter-dialog-button').click(function(e){
        var availWidth = $('html').width();
        availWidth = availWidth > 900 ? 700 : (availWidth < 500 ? availWidth - 10 : availWidth*0.7)
        var ALDialog = $('#acceptance-letter-dialog').dialog({
            modal:true,
            minWidth: availWidth,
            show: {
                effect: "scale",
                duration: 200
            },
            hide: {
                effect: "explode",
                duration: 200
            },
            open: function () {
                $('.ui-widget-overlay').on('click', function () {
                    ALDialog.dialog('close');
                });
            }
        });
    });

    /**
     * Close Acceptance Letter Modal
     */
    $('#acceptance-letter-dialog-close').click(
        function(e) {
            $('#acceptance-letter-dialog').dialog('close');
        }
    );

    $('.progressStatus').on('change', function(e){
        var newval=$(this).val();
        var confirmed = true;
        if (newval === "accepted") {
            confirmed = confirm("This student will be accepted, and the application will send an email to welcoming him/her. Are you sure you want to change the status for this user?");
        }
        if (confirmed) {
            this.form.submit();
        } else {
            this.value=this.getAttribute("PrvSelectedValue");
        }
    });

    /**
     * Sort rows for registered users

    var asc = true;
    var sortRowsRegisteredCallback = function (e) {
      var filter = this.dataset.field;
      var allowedFilters = ["name","uni","period","status","pctg"];
      if (allowedFilters.indexOf(filter) === -1) {
        return
      }
      var order = $('.order');
      order.removeClass('order order-asc order-desc')
      $(this).addClass('order ' + (asc ? "order-asc" : "order-desc"));

      [].slice.call(document.querySelectorAll('[data-' + filter +']')).sort(
        function(a,b){
            var a_f = a.dataset[filter];
            var b_f = b.dataset[filter];
            var compare = (!isNaN(parseFloat(a_f)) && !isNaN(parseFloat(b_f))) ?
                (parseFloat(a_f) > parseFloat(b_f)) : (a_f.toLowerCase() > b_f.toLowerCase());
            var res = (compare) - (!compare);
            return asc ? res: -res
      }).map(function(n,i){console.log(n); n.parentElement.style.order = i+1; return n;});
      asc = !asc;
    };

    $('.flex-table-header').click(sortRowsRegisteredCallback)
     */
});


