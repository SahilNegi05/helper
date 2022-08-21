import React from 'react';
export const generatePageSlug = (slug) => {
    return slug.toLowerCase().replaceAll(' ','-')
}