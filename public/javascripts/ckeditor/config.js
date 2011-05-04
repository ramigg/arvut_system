/*
 Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
 */


//http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Styles
CKEDITOR.addStylesSet('my_styles',
        [
            // Block Styles

            // Inline Styles
            // LI
            { name : 'Small margin', element : 'li', attributes : { 'class' : 'li_small_margin' } },
            { name : 'Normal margin', element : 'li', attributes : { 'class' : 'li_normal_margin' } },
            // Links
            { name : 'Text item', element : 'a', attributes : { 'class' : 'icon_text' } },
            { name : 'Audio item', element : 'a', attributes : { 'class' : 'icon_audio' } },
            { name : 'Video item', element : 'a', attributes : { 'class' : 'icon_video' } },
            { name : 'PDF item', element : 'a', attributes : { 'class' : 'icon_pdf' } },
            { name : 'PPT item', element : 'a', attributes : { 'class' : 'icon_ppt' } }
        ]);

//http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Setting_Configurations
CKEDITOR.editorConfig = function(config) {
    config.format_tags = 'p;h2;h3;h4;h5;h6';
    
    config.toolbar = 'Min';

    config.toolbar_Min =
            [
                ['PasteText','PasteFromWord','RemoveFormat'],
                //    '/',
                ['Undo','Redo'],
                ['Bold','Italic'],
                ['NumberedList','BulletedList'],
                ['JustifyLeft','JustifyCenter','JustifyRight'],
                ['Link','Unlink','Image','Flash'],
                //    '/',
                ['Table'],
                ['Styles','Format'],
                ['Source', 'Maximize', 'ShowBlocks']
            ];

    config.toolbar_Min_Rav =
            [
                ['PasteText','PasteFromWord','RemoveFormat'],
                //    '/',
                ['Bold','Italic'],
                ['NumberedList','BulletedList'],
                ['JustifyLeft','JustifyCenter','JustifyRight'],
                ['Source', 'Maximize', 'ShowBlocks']
            ];

    config.toolbar_Min_Comments =
            [
                ['PasteText','PasteFromWord','RemoveFormat'],
                ['Bold','Italic'],
                ['NumberedList','BulletedList'],
                ['JustifyLeft','JustifyCenter','JustifyRight'],
                ['Maximize']
            ];

    config.toolbar_Min_he =
            [
                ['PasteText','PasteFromWord','RemoveFormat'],
                ['Bold','Italic'],
                ['NumberedList','BulletedList'],
                ['JustifyRight','JustifyCenter','JustifyLeft'],
                ['Link','Unlink'],
                ['Image','Flash'],
                ['Source', '-', 'Maximize', 'ShowBlocks'],
                ['Table'],
                ['Styles', 'Format']
            ];

    config.toolbar_Min_Rav_he =
            [
                ['PasteText','PasteFromWord','RemoveFormat'],
                ['Bold','Italic'],
                ['NumberedList','BulletedList'],
                ['JustifyRight','JustifyCenter','JustifyLeft'],
                ['Source', 'Maximize', 'ShowBlocks']
            ];

    config.toolbar_Min_Comments_he =
            [
                ['PasteText','PasteFromWord','RemoveFormat'],
                ['Bold','Italic'],
                ['NumberedList','BulletedList'],
                ['JustifyLeft','JustifyCenter','JustifyRight'],
                ['Maximize']
            ];

    config.toolbar_Pic =
            [
                ['Image']
            ];

    config.toolbar_Pic_he =
            [
                ['Image']
            ];

    config.stylesCombo_stylesSet = 'my_styles';
    config.PreserveSessionOnFileBrowser = true;
//TODO: Change this param so ckeditor stylesheet will work
    config.contentsCss = ['http://kabbalahgroup.info/internet/stylesheets/styles.css', '/stylesheets/styles.css'];
    config.resize_enabled = false;
    config.toolbarCanCollapse = false;
};

