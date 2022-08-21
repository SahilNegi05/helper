// import React from 'react';
// import DatePicker from 'react-datepicker';
// import { arrayOf, func, instanceOf, number, shape, string } from 'prop-types';
// import { DateCalenderInput, RecordTile } from '../../components';

// const Tiles = ({
//   data, fromDate, toDate, onDateChange, title,
// }) => (
//   <div className="mb-3 card">
//     <div className="card-header-tab card-header px-3">
//       <div className="card-header-title font-size-lg text-capitalize font-weight-normal flex-fill">
//         {title}
//       </div>
//       {typeof onDateChange === 'function' && (
//         <div className="flex-fill card-header-title font-size-sm text-capitalize font-weight-normal">
//           <form className="flex-fill">
//             <div className="d-flex align-items-center pt-1 flex-wrap">
//               <div className="form-row align-items-center flex-fill mb-3 mb-lg-0 justify-content-end">
//                 <div className="mr-2 mb-2 mb-md-0 d-flex align-items-center">
//                   <DatePicker
//                     title='From Date'
//                     name='fromDate'
//                     id='fromDate'
//                     dateFormat="dd/MM/yyyy"
//                     placeholder='From Date'
//                     minDate={new Date()}
//                     customInput={<DateCalenderInput />}
//                     selected={fromDate}
//                     onChange={(date) => onDateChange('fromDate', date)}
//                   />
//                 </div>
//                 <div className="mr-1 mb-2 mb-md-0 d-flex align-items-center">
//                   <DatePicker
//                     title='To Date'
//                     name='toDate'
//                     id='toDate'
//                     placeholder='To Date'
//                     dateFormat="dd/MM/yyyy"
//                     minDate={new Date()}
//                     customInput={<DateCalenderInput />}
//                     selected={toDate}
//                     onChange={(date) => onDateChange('toDate', date)}
//                   />
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//     <div className="main-card my-4 px-3">
//       <div className="row">
//         {data.map((type) => <RecordTile key={`${type.title}-${type.count}`} {...type} />)}
//       </div>
//     </div>
//   </div>
// );

// Tiles.propTypes = {
//   data: arrayOf(shape({
//     className: string,
//     count: number.isRequired,
//     subtitle: string.isRequired,
//     title: string.isRequired,
//   })).isRequired,
//   fromDate: instanceOf(Date),
//   onDateChange: func,
//   title: string.isRequired,
//   toDate: instanceOf(Date),
// };

// Tiles.defaultProps = {
//   fromDate: null,
//   onDateChange: null,
//   toDate: null,
// };

// export default Tiles;
