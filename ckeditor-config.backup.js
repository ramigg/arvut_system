/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/


//http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Styles
CKEDITOR.addStylesSet( 'my_styles',
    [
    // Block Styles

    // Inline Styles
    { name : 'Text item', element : 'a', attributes : { 'class' : 'icon_text' } },
    { name : 'Audio item', element : 'a', attributes : { 'class' : 'icon_audio' } },
    { name : 'Video item', element : 'a', attributes : { 'class' : 'icon_video' } },
    { name : 'PDF item', element : 'a', attributes : { 'class' : 'icon_pdf' } },
    { name : 'PPT item', element : 'a', attributes : { 'class' : 'icon_ppt' } }
    ]);

//http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Setting_Configurations
CKEDITOR.editorConfig = function( config )
{
    config.toolbar = 'Min';
    config.toolbar_Min =
    [
    ['PasteText','PasteFromWord','RemoveFormat'],
    //    '/',
    ['Bold','Italic','Underline'],
    ['NumberedList','BulletedList'],
    ['JustifyLeft','JustifyCenter','JustifyRight'],
    ['Link','Unlink','Image','Flash'],
    //    '/',
    ['Styles'],
    ['Source', 'Maximize', 'ShowBlocks']
    ];

    config.toolbar_Min_he =
    [
    ['PasteText','PasteFromWord','RemoveFormat'],
    //    '/',
    ['Bold','Italic','Underline'],
    ['NumberedList','BulletedList'],
    ['JustifyRight','JustifyCenter','JustifyLeft'],
    ['Link','Unlink'],
    ['Image','Flash'],
    ['Source', '-', 'Maximize', 'ShowBlocks'],
    ['Styles']
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
    config.contentsCss = '/simulator/stylesheets/main.css';
    config.resize_enabled = false;
    config.toolbarCanCollapse = false;
};

