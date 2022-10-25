// const { query } = require('express');
const fs = require('fs');
const Tour = require('../model/tourModel');

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail', //   message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'name or price not found',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    //filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'field'];
    excludedFields.forEach((e) => delete queryObj[e]);

    //Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let quries = Tour.find(JSON.parse(queryStr));
    //pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    quries = quries.skip(skip).limit(limit);

    if (req.query.page) {
      const numTour = await tours.countDocuments();
      if (skip >= numTour) throw new Error('this paeg dose not exist');
    }

    if (req.query.sort) {
      //sorting

      const sortBy = req.query.sort.split(',').join(' ');
      quries = quries.sort(sortBy);
    } else {
      quries = quries.sort('-createdAt');
    }

    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   quries = quries.select(fields);
    //   console.log(quries);
    // } else {
    //   quries = quries.select('-__v');
    //   console.log(query);
    // }

    //Excuting

    const tours = await quries;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: error,
    });
    console.log(error);
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    console.log('error', error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        error,
      },
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id, req.body);
    res.status(204).json({
      status: 'success',
      data: 'tour deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        error,
      },
    });
  }
};


//////////////////////////////////

const mongoose = require('mongoose');
const fs = require('fs');
const dotEnv = require('dotenv');
dotEnv.config({ path: './config.env' });
const Tour = require('../../model/tourModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const uploadHandler = async () => {
  try {
    await Tour.create(tours);
    console.log('tours uploaded successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
const deleteHandler = async () => {
  try {
    await Tour.deleteMany();
    console.log('tours delete successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  uploadHandler();
} else if (process.argv[2] === '--delete') {
  deleteHandler();
  console.log('wow');
}

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

console.log(process.argv);
