route.get("/fetchOrders/:adminName", fetchOrders); // normal route

route.get("/fetchOrders/:adminName", authMiddleware, fetchOrders); // route using authMiddleware
