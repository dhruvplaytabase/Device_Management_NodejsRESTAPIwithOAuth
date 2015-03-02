// Load required packages
var Device = require('../models/device');

// Create endpoint /api/devices for POSTS
exports.postDevices = function(req, res) {
  // Create a new instance of the device model
  var device = new Device();

  // Set the device properties that came from the POST data
  device.name = req.body.name;
  device.type = req.body.type;
  device.quantity = req.body.quantity;
  device.userId = req.user._id;

  // Save the device and check for errors
  device.save(function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'device added to the locker!',
      data: device
    });
  });
};

// Create endpoint /api/devices for GET
exports.getDevices = function(req, res) {
  // Use the device model to find all device
  Device.find({userId: req.user._id} , function(err, devices) {
    if (err)
      res.send(err);

    res.json(devices);
  });
};

// Create endpoint /api/devices/:device_id for GET
exports.getDevice = function(req, res) {
  // Use the device model to find a specific device
  Device.findById({userId: req.user._id, _id:req.params.device_id }, function(err, device) {
    if (err)
      res.send(err);

    res.json(device);
  });
};

// Create endpoint /api/devices/:device_id for PUT
exports.putDevice = function(req, res) {
  // Use the device model to find a specific device
  Device.findById({ userId: req.user._id, _id: req.params.device_id }, { quantity: req.body.quantity }, function(err, device) {
    if (err)
      res.send(err);

    // // Update the existing device quantity
    // device.quantity = req.body.quantity;

    // // Save the device and check for errors
    // device.save(function(err) {
    //   if (err)
    //     res.send(err);

      res.json({message: num + 'updated'});
    });
  // });
};

// Create endpoint /api/devices/:device_id for DELETE
exports.deleteDevice = function(req, res) {
  // Use the device model to find a specific device and remove it
  Device.findByIdAndRemove({ userId: req.user._id, _id: req.params.device_id }, function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'Device removed from the locker!'
    });
  });
};