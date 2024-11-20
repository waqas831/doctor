import { Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import b1 from "../images/b1.jpeg";
import b2 from "../images/b2.jpeg";

const fadeImages = [
    {
        url: b1,
    },
    {
        url: b2,
    }
];

const ImageSlider = () => {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '100vw',
                overflow: 'hidden', 
                marginTop: 10,
            }}
        >
            <Carousel
                interval={3000}
                indicators={false}
                navButtonsAlwaysInvisible
            >
                {fadeImages.map((fadeImage, index) => (
                    <Box
                        key={index}
                        component="img"
                        src={fadeImage.url}
                        alt={`Slide ${index + 1}`}
                        sx={{
                            width: '100%',
                            height: { xs: '300px', sm: '500px', md: '700px', lg: '700px' }, // Responsive height
                            objectFit: 'fill', // Ensure image covers the container without distortion
                        }}
                    />
                ))}
            </Carousel>
        </Box>
    );
};

export default ImageSlider;
