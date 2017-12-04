// Copyright 2017, Deer Project.

#ifndef SRC_GUI_H_
#define SRC_GUI_H_

#include <gtk/gtk.h>
#include "glog/logging.h"

namespace deer {
    class deer_gui;
};  // namespace deer


class deer::deer_gui {
 private:
    GtkWidget *window;

 public:
    deer_gui();
    void load_gui(int argc, char **argv);
    static void destroy(GtkWidget *widget, gpointer data);
    ~deer_gui();
};

#endif  // SRC_GUI_H_
