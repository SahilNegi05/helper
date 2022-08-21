import React from 'react';
import { SUCCESS_TYPE, SUCCESS_MSG, ERROR_TYPE, ERROR_MSG, FAILED_TYPE, FAILED_MSG, VALIDATION_MSG, VALIDATION_TYPE } from '../constants/message'

export const message = (type) => {
    console.log(type)
    switch (type) {
        case SUCCESS_TYPE:
            return SUCCESS_MSG
        case ERROR_TYPE:
            return ERROR_MSG
        case FAILED_TYPE:
            return FAILED_MSG
        case VALIDATION_TYPE:
            return VALIDATION_MSG
        default:
            return null
    }
}