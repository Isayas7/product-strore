import Request from "../models/request.js";
import Category from "../models/category.js";
// CREATE Request

export const createRequest = async (req, res, next) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(200).send(newRequest);
  } catch (err) {
    next(err);
  }
};

//UPDATE Request
export const updateRequest = async (req, res, next) => {
  try {
    const updatedAmount = req.body.amount;
    if (updatedAmount < 1) {
      return res
        .status(400)
        .json({ error: "Amount must be greater than or equal to 1" });
    }
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedRequest);
  } catch (err) {
    next(err);
  }
};

//DELETE Request

export const deleteRequest = async (req, res, next) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json("Request has been deleted");
  } catch (err) {
    next(err);
  }
};
//GET Request
export const getRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
};

//GET Requests

// export const getRequests = async (req, res, next) => {
//   try {
//     const { requestName, type, ...others } = req.query;
//     let query = others;
//     if (requestName) {
//       query.requestName = requestName;
//     }
//     if (type) {
//       query.type = type;
//     }
//     const requests = await Request.find(query);
//     res.status(200).json(requests);
//   } catch (err) {
//     next(err);
//   }
// };
export const getRequests = async (req, res, next) => {
  try {
    const requests = await Request.find().sort({
      createdAt: -1,
    });
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
};
