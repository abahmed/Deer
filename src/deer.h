// Copyright 2017, Deer Project.

#ifndef SRC_DEER_H_
#define SRC_DEER_H_

#include <gtk/gtk.h>
#include "glog/logging.h"
#include "gui.h"

namespace deer {
class deer_app;
};  // namespace deer


class deer::deer_app {
 private:
    deer::deer_gui gui;

 public:
    deer_app(int argc, char **argv);
    ~deer_app();
};

#endif  // SRC_DEER_H_
