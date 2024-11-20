import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Dialog, DialogContent, TextField, Typography } from '@mui/material';

const Ilustra = () => {
  const [openForm, setOpenForm] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const handleOpenForm = (formNumber) => {
    setOpenForm(formNumber);
  };

  const handleCloseForm = () => {
    setOpenForm(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 500;
      canvas.height = 400;
      canvas.style.border = "1px solid #000";

      const context = canvas.getContext("2d");
      context.lineCap = "round";
      context.lineWidth = 5;
      context.strokeStyle = "#000";
      contextRef.current = context;
    }
  }, [openForm]);

  const handleMouseDown = (e) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    if (isErasing) {
      contextRef.current.strokeStyle = "#fff";
    } else {
      contextRef.current.strokeStyle = "#000";
    }
    contextRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    contextRef.current.stroke();
  };

  const handleMouseUp = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const handleDraw = () => {
    setIsErasing(false);
  };

  const handleErase = () => {
    setIsErasing(true);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => handleOpenForm(3)}>
        Open Ilustra Form
      </Button>

      <Dialog open={openForm === 3} onClose={handleCloseForm}>
        <DialogContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Form 3: Ilustra
          </Typography>

          <form>
            <TextField label="Patient Name" fullWidth margin="normal" />
            <TextField label="Condition" fullWidth margin="normal" />
            <TextField label="Recommended Rest Days" fullWidth margin="normal" />

            <Box>
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>

            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" onClick={handleDraw}>
                Draw
              </Button>
              <Button variant="contained" color="secondary" onClick={handleErase}>
                Erase
              </Button>
            </Box>

            <Button onClick={handleCloseForm} variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Ilustra;
