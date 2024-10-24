import React, {useState, useContext} from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const createComment = () => {
    const user = useContext(AuthContext);
    const localTime = new Date().toLocaleDateString();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        text: '',
        createdAt: localTime
    });

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
}