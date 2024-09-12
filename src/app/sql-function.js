'use client';
import { incrementHits } from '@/db/queries';
import React from 'react';
import { fetchCount } from '@/app/data-fetch';

//access sql database
//useEffect hook that follows increment hits

const counter = await fetchCount();

function IncrementHits({slug}){
    React.useEffect(() => {
        incrementHits(slug)
        }, []);
}

export default IncrementHits;
