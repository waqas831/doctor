import React from 'react';
import { Box, Typography, Avatar, Grid, Paper } from '@mui/material';
import star from "../../images/landstars.svg";
import patientImg from "../../images/land-patientImg.svg";
import patientImg2 from "../../images/patientImg2.svg";
import patientImg3 from "../../images/patientImg3.svg";

const LandingPatient = () => {
    const testimonials = [
        {
            detail: "Dr. Ghaznain's cough medicine worked wonders! My cough subsided quickly, and I felt relief within just a few doses. Highly recommend his prescription!",
            img: patientImg3,
            name: "David",
        },
        {
            detail: "Dr. Ghaznain provided exceptional care for my UTI! His treatment plan was effective, and I felt relief within a day. He listened attentively, explained everything clearly, and followed up to ensure my recovery. Highly recommend his expertise for anyone dealing with this issue!",
            img: patientImg,
            name: "Cynthia Stroke",
        },
        {
            detail: "Fantastic experience! Dr. Ghaznain was incredibly efficient, and my prescription was sent within 5 minutes. Quick, professional, and convenient – highly recommend!",
            img: patientImg2,
            name: "Lara",
        },
    ];

    return (
        <Box my={8} textAlign="center">
            <Box mb={4}>
                <Typography variant="h4" fontWeight="bold">
                    What Our Patients Say
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    More than 50 five-star reviews
                </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
                {testimonials.map((testimonial, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: 2,
                                textAlign: 'center',
                            }}
                        >
                            {/*<Avatar
                                src={star}
                                alt="Star Rating"
                                sx={{ width: 50, height: 50, mb: 2 }}
                            />*/}
                            <img src={star} alt="Star Rating" />

                            <Typography
                                variant="body1"
                                sx={{ mb: 2, minHeight: 80 }}
                            >
                                {testimonial.detail}
                            </Typography>
                            <Avatar
                                src={testimonial.img}
                                alt={testimonial.name}
                                sx={{ width: 80, height: 80, mb: 1 }}
                            />
                            <Typography variant="h6" fontWeight="bold">
                                {testimonial.name}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default LandingPatient;
