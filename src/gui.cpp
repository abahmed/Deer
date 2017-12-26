// Copyright 2017, Deer Project.

#include "gui.h"

// Constructor of deer_gui class.
deer::deer_gui::deer_gui()
    : main_window_ui_path("src/ui/main-window.ui")
    , icons_list(NULL)
{
    // Initialize main window.
    LOG(INFO) << "Initializing Deer main window...";
}

// load application window.
void deer::deer_gui::load_gui(int argc, char **argv) {
    LOG(INFO) << "load_gui\n";

    gtk_init(&argc, &argv);

    // load main window ui builder
    builder = gtk_builder_new();
    gtk_builder_add_from_file(builder, main_window_ui_path, NULL);

    // load window object
    window = gtk_builder_get_object(builder, "window");
    
    // once the window object loaded, set the icons
    set_icons();

    // register destroy handler
    g_signal_connect(window, "destroy", G_CALLBACK(destroy), NULL);

    // wait fot coming events
    gtk_main();
}

// window destroy callback.
void deer::deer_gui::destroy(GtkWidget *widget, gpointer data) {
    LOG(INFO) << "Window destroy called";
    gtk_main_quit();
}

// Destructor of deer_gui class. Called on quiting the window.
deer::deer_gui::~deer_gui() {
    LOG(INFO) << "Gui class destructor called";
    g_list_free_full(icons_list);
}

deer::deer_gui::set_icons() {
    GError *error;
    
    icon_32 = gdk_pixbuf_new_from_file("resources/Deer-32.png", error);
    if(icon_32 == NULL)
        LOG(WARNING) << "Could not load 32x32 Deer icon.";
    
    icon_48 = gdk_pixbuf_new_from_file("resources/Deer-48.png", error);
    if(icon_48 == NULL)
        LOG(WARNING) << "Could not load 48x48 Deer icon.";
    
    icon_64 = gdk_pixbuf_new_from_file("resources/Deer-64.png", error);
    if(icon_64 == NULL)
        LOG(WARNING) << "Could not load 64x64 Deer icon.";
    
    icon_128 = gdk_pixbuf_new_from_file("resources/Deer-128.png", error);
    if(icon_128 == NULL)
        LOG(WARNING) << "Could not load 128x128 Deer icon.";
    
    g_list_append(icons_list, icon_32);
    g_list_append(icons_list, icon_48);
    g_list_append(icons_list, icon_64);
    g_list_append(icons_list, icon_128);
    
    gtk_window_set_icon_list(window, icons_list);
}
                        
