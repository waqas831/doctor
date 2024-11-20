import jsPDF from "jspdf";
import TopBorderImage from "../../assets/logo.png";
import axiosInstance from "../interceptors/AxiosInstance";
import React, { useState } from "react";
import { useEffect } from "react";



const formatDate = (dateString) => {
  const date = new Date(dateString); 
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear(); 
  
  return `${day}-${month}-${year}`; 
};

//Form 1 Referral to Emergency Department
export const generatePDFWithDataRED = async (formTitle, data) => {
  const doc = new jsPDF();

  
  const pageWidth = 210; 
  const logoWidth = 40; 
  const logoHeight = 12; 
  const logoX = 10; 
  const borderY = 0; 
  const borderHeight = 20; 

  
  return new Promise((resolve, reject) => {
    
    const img = new Image();
    img.src = TopBorderImage; 

    
    img.onerror = function () {
      console.error("Failed to load the image.");
      reject(new Error("Image failed to load."));
    };

  
  img.onload = async function () {
    
    doc.setFillColor(58, 182, 187);
    doc.rect(0, borderY, pageWidth, borderHeight, "F"); 

    
    doc.addImage(img, "PNG", logoX, 3, logoWidth, logoHeight); 

    
    doc.setFontSize(8); 
    doc.setTextColor(255, 255, 255); 
    doc.text('Clinic Name: GPLine', pageWidth - 55, 5); 
    doc.text('Address: Boyle Rd, Frenchpark Demesne,', pageWidth - 55, 9); 
    doc.text('Frenchpark, Co. Roscommon, F45 FX62', pageWidth - 55, 13);
    doc.text('Email: info@gpline.ie', pageWidth - 55, 17); 

    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); 
    doc.text(formTitle, pageWidth / 2, 30, { align: "center" }); 

    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Patient Details: `, 10, 50); 

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Patient Name: ${data.name || "________________"}`, 10, 60); 
    doc.text(`Date of Birth: ${data.dob || "________________"}`, 10, 70);
    doc.text(`Phone Number: ${data.phoneNumber || "________________"}`, 10, 80);
    doc.text(`Address: ${data.address || "________________"}`, 10, 90);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text('Referral Reasons:', 10, 130); 
    doc.setFontSize(12);
    doc.rect(10, 135, 190, 20); 
    doc.text(`${data.referralinfo || "________________"}`, 12, 140, { maxWidth: 186 }); 


    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text('Dear Doctor, Kindly accept the patient mentioned above', 10,120)
    


   
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Doctor Name: ${data.doctorName || "________________"}`, 10, 180);
    doc.text(`IMC Number: ${data.imcNumber || "________________"}`, 10, 190);
    //doc.text(`Doctor Signature: ${data.doctorSignature || "________________"}`, 10, 200);
    // console.log("the signature of doctor is THISSSS: ", data.doctor_SIGNATURE)
    // const testUrl = "https://via.placeholder.com/150";
    // const base64Signature = await getDoctorSignatureBase64(testUrl);
    // 
    
    //console.log("This is here the doctor signature before function call in pdf generator: ",data.doctor_SIGNATURE)
    const base64Signature = data.doctor_SIGNATURE;
    //fetchedUrl
    // const fetchedUrl = localStorage.getItem('doctorSignatureUrl');

    // const base64Signature = await getDoctorSignatureBase64(fetchedUrl);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Doctor Signature:", 10, 200);

    if (base64Signature) {
      // Extract the MIME type dynamically from the Base64 string
      const mimeType = base64Signature.match(/^data:(image\/[a-zA-Z]+);base64,/);
      const imageType = mimeType ? mimeType[1].split("/")[1].toUpperCase() : 'PNG'; // Default to 'PNG'

      doc.addImage(base64Signature, imageType, 50, 190, 25, 15); // Dynamically use image type
    } else {
      doc.text("Doctor Signature: _________________", 10, 200);
    }

      doc.text(`Date: ${formatDate(data.datee) || "________________"}`, 10, 210);
    //doc.text(`Date: ${data.datee || "________________"}`, 10, 210);

   
   const pdfBlob = doc.output('blob');
   resolve(pdfBlob); 
 };
});
};



//Form 2 Prescription
export const generatePDFWithDataPrescribe = async (formTitle, data) => {
  const doc = new jsPDF();

  
  const pageWidth = 210; 
  const logoWidth = 40;
  const logoHeight = 12; 
  const logoX = 10; 
  const borderY = 0; 
  const borderHeight = 20; 

  
  return new Promise((resolve, reject) => {
    
    const img = new Image();
    img.src = TopBorderImage; 

    
    img.onerror = function () {
      console.error("Failed to load the image.");
      reject(new Error("Image failed to load."));
    };

  
  img.onload = async function () {
    
    doc.setFillColor(58, 182, 187); 
    doc.rect(0, borderY, pageWidth, borderHeight, "F"); 

    
    doc.addImage(img, "PNG", logoX, 3, logoWidth, logoHeight); 

    
    doc.setFontSize(8); 
    doc.setTextColor(255, 255, 255); 
    doc.text('Clinic Name: GPLine', pageWidth - 55, 5); 
    doc.text('Address: Boyle Rd, Frenchpark Demesne,', pageWidth - 55, 9); 
    doc.text('Frenchpark, Co. Roscommon, F45 FX62', pageWidth - 55, 13); 
    doc.text('Email: info@gpline.ie', pageWidth - 55, 17); 

    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); 
    doc.text(formTitle, pageWidth / 2, 30, { align: "center" }); 

    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); 
    doc.text(`Patient Name: ${data.name || "________________"}`, 10, 60); 
    doc.text(`Date of Birth: ${data.dob || "________________"}`, 10, 70);
    doc.text(`Phone Number: ${data.phoneNumber || "________________"}`, 10, 80);
    doc.text(`Address: ${data.address || "________________"}`, 10, 90);


const headers = ["S No", "Medication Name", "Strength", "Dosage Form", "Quantity", "Directions"];
const colWidths = [15, 45, 35, 35, 30, 50]; 


const tableWidth = colWidths.reduce((acc, width) => acc + width, 0);


const pdfPageWidth = doc.internal.pageSize.getWidth(); 
const startX = (pdfPageWidth - tableWidth) / 2; 
const startY = 100;
const cellPadding = 2; 
const defaultCellHeight = 10; 

function getCellHeight(text, colWidth) {
  const textWidth = doc.getTextWidth(text); 
  const numLines = Math.ceil(textWidth / (colWidth - cellPadding * 2)); 
  return numLines * defaultCellHeight; 
}


doc.setFontSize(12);
doc.setFillColor(58, 182, 187); 
doc.rect(startX, startY, tableWidth, defaultCellHeight, "F"); 


let xPos = startX;
headers.forEach((header, i) => {
  doc.setTextColor(255, 255, 255); 
  doc.text(header, xPos + cellPadding, startY + 7); 
  xPos += colWidths[i]; 
});


let yPos = startY + defaultCellHeight; 
data.prescriptions.forEach((row, index) => {
  
  const rowData = [
    String(row.sno || "________________"),
    row.medicationname || "________________",
    row.strength || "________________",
    row.dosageform || "________________",
    row.quantity || "________________",
    row.directions || "________________"
  ];


  const rowHeight = Math.max(...rowData.map((text, i) => getCellHeight(text, colWidths[i])));

  
  doc.setFillColor(255, 255, 255); 
  doc.rect(startX, yPos, tableWidth, rowHeight, "F");

  xPos = startX;
  rowData.forEach((cellText, i) => {
    const cellWidth = colWidths[i];
    const textLines = doc.splitTextToSize(cellText, cellWidth - cellPadding * 2); 
    doc.setTextColor(0, 0, 0); 

    
    textLines.forEach((line, lineIndex) => {
      doc.text(line, xPos + cellPadding, yPos + cellPadding + 7 + (lineIndex * defaultCellHeight));
    });
    xPos += cellWidth; 
  });

  
  doc.setDrawColor(0, 0, 0);
  doc.line(startX, yPos + rowHeight, startX + tableWidth, yPos + rowHeight);

  
  yPos += rowHeight;
});


xPos = startX;
colWidths.forEach((width) => {
  doc.line(xPos, startY, xPos, yPos); 
  xPos += width;
});


doc.line(startX + tableWidth, startY, startX + tableWidth, yPos);


    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text('Special Instructions', 10, 170); 
    doc.setFontSize(12);
    doc.rect(10, 175, 190, 25); 
    doc.text(`${data.specialinstructions || "________________"}`, 12, 180, { maxWidth: 186 }); 

    
    doc.text(`Doctor Name: ${data.doctorName || "________________"}`, 10, 210);
    doc.text(`IMC Number: ${data.imcNumber || "________________"}`, 10, 220);
    //doc.text(`Doctor Signature: ${data.doctorSignature || "________________"}`, 10, 230);


    // 
    

    //const fetchedUrl = localStorage.getItem('doctorSignatureUrl');
    //console.log("This is here the doctor signature before function call in pdf generator: ",data.doctor_SIGNATURE)
    //const base64Signature = await getDoctorSignatureBase64(data.doctor_SIGNATURE);
    const base64Signature = data.doctor_SIGNATURE;
    //const base64Signature = await getDoctorSignatureBase64(data.doctor_SIGNATURE);
    //const base64Signature = await getDoctorSignatureBase64(fetchedUrl);


    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Doctor Signature:", 10, 230);

    if (base64Signature) {
      // Extract the MIME type dynamically from the Base64 string
      const mimeType = base64Signature.match(/^data:(image\/[a-zA-Z]+);base64,/);
      const imageType = mimeType ? mimeType[1].split("/")[1].toUpperCase() : 'PNG'; // Default to 'PNG'

      doc.addImage(base64Signature, imageType, 50, 220, 25, 15); // Dynamically use image type
    } else {
      doc.text("Doctor Signature: _________________", 10, 230);
    }


    doc.text(`Date: ${formatDate(data.datee) || "________________"}`, 10, 240);

 
    
      const pdfBlob = doc.output('blob');
      resolve(pdfBlob); 
    };
  });
};


//Form 3 Medical certificate
export const generatePDFWithDataMedCer = async (formTitle, data) => {
  const doc = new jsPDF();

  
  const pageWidth = 210; 
  const logoWidth = 40; 
  const logoHeight = 12; 
  const logoX = 10; 
  const borderY = 0; 
  const borderHeight = 20; 

  return new Promise((resolve, reject) => {
    
    const img = new Image();
    img.src = TopBorderImage; 

    
    img.onerror = function () {
      console.error("Failed to load the image.");
      reject(new Error("Image failed to load."));
    };

    
    img.onload = async function () {
      
      doc.setFillColor(58, 182, 187); 
      doc.rect(0, borderY, pageWidth, borderHeight, "F"); 

      
      doc.addImage(img, "PNG", logoX, 3, logoWidth, logoHeight); 

      
    doc.setFontSize(8); 
    doc.setTextColor(255, 255, 255); 
    doc.text('Clinic Name: GPLine', pageWidth - 55, 5); 
    doc.text('Address: Boyle Rd, Frenchpark Demesne,', pageWidth - 55, 9); // 
    doc.text('Frenchpark, Co. Roscommon, F45 FX62', pageWidth - 55, 13); 
    doc.text('Email: info@gpline.ie', pageWidth - 55, 17); 

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0); 
      doc.text(formTitle, pageWidth / 2, 30, { align: "center" }); 

      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); 
      doc.text(`Patient Name: ${data.name || "________________"}`, 10, 40); 
      doc.text(`Date of Birth: ${data.dob || "________________"}`, 10, 50);
      doc.text(`Phone Number: ${data.phoneNumber || "________________"}`, 10, 60);
      doc.text(`Address: ${data.address || "________________"}`, 10, 70);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.text('Is/Was Suffering From:', 10, 80); 
      doc.setFontSize(12);
      doc.rect(10, 85, 190, 30); 
      doc.text(`${data.sufferingdisease || "________________"}`, 12, 90, { maxWidth: 186 }); 

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text('This is to certify that in my opinion the above patient', 10, 130);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Examined on: ${data.datee || "________________"}`, 10, 140);
      doc.text(`And is unable to attend work from: ${data.startdate || "________________"}`, 10, 150);
      doc.text(`Until/Inclusive: ${data.enddate || "________________"}`, 10, 160);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Doctor Name: ${data.doctorName || "________________"}`, 10, 180);
      doc.text(`IMC Number: ${data.imcNumber || "________________"}`, 10, 190);
      doc.text(`Date: ${formatDate(data.datee) || "________________"}`, 10, 200);
      //doc.text(`Doctor Signature: ${data.doctorSignature || "________________"}`, 10, 210);


      // 
      //console.log("This is here the doctor signature before function call in pdf generator: ",data.doctor_SIGNATURE)
      //const base64Signature = await getDoctorSignatureBase64(data.doctor_SIGNATURE);
      const base64Signature = data.doctor_SIGNATURE;
      //const base64Signature = await getDoctorSignatureBase64(data.doctor_SIGNATURE);
      //const fetchedUrl = localStorage.getItem('doctorSignatureUrl');

      //const base64Signature = await getDoctorSignatureBase64(fetchedUrl);


    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Doctor Signature:", 10, 210);

    if (base64Signature) {
      // Extract the MIME type dynamically from the Base64 string
      const mimeType = base64Signature.match(/^data:(image\/[a-zA-Z]+);base64,/);
      const imageType = mimeType ? mimeType[1].split("/")[1].toUpperCase() : 'PNG'; // Default to 'PNG'

      doc.addImage(base64Signature, imageType, 50, 200, 25, 15); // Dynamically use image type
    } else {
      doc.text("Doctor Signature: _________________", 10, 210);
    }



      doc.text('Note: The letter is being issued on  the request of the patient named above, and is not for Court or for Medicolegal purposes. The information contained in this letter is based on the medical details provided by the patient. No physical examination was performed.', 10, 230, { maxWidth: '190' });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text('FAQ Employer:', 105, 250, { align: 'center' });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text('This Certificate is issued by GPline healthcare Services platform. GPline is a registered Online platform providing healthcare Services in Ireland.  Please do not hesitate to contact us if you need further details.', 10, 260, { maxWidth: '190' });
      doc.text("Email: info@gpline.ie", 10, 280);

      const pdfBlob = doc.output('blob');
      resolve(pdfBlob); 
    };
  });
};


//Form 5 Clinical notes
export const generatePDFWithDataClinicalNotes = async (formTitle, data) => {
  const doc = new jsPDF();

  // Constants for layout
  const pageWidth = 210; 
  const logoWidth = 40; 
  const logoHeight = 12; 
  const logoX = 10; 
  const borderY = 0; 
  const borderHeight = 20; 

  return new Promise((resolve, reject) => {
    
    const img = new Image();
    img.src = TopBorderImage; 

    
    img.onerror = function () {
      console.error("Failed to load the image.");
      reject(new Error("Image failed to load."));
    };

  
  img.onload = async function () {
    
    doc.setFillColor(58, 182, 187); 
    doc.rect(0, borderY, pageWidth, borderHeight, "F"); 

    
    doc.addImage(img, "PNG", logoX, 3, logoWidth, logoHeight); 

    
    doc.setFontSize(8); 
    doc.setTextColor(255, 255, 255); 
    doc.text('Clinic Name: GPLine', pageWidth - 55, 5); 
    doc.text('Address: Boyle Rd, Frenchpark Demesne,', pageWidth - 55, 9); 
    doc.text('Frenchpark, Co. Roscommon, F45 FX62', pageWidth - 55, 13); 
    doc.text('Email: info@gpline.ie', pageWidth - 55, 17); 

    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); // Black text for the title
    doc.text(formTitle, pageWidth / 2, 30, { align: "center" }); 

    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); 
    doc.text(`Patient Name: ${data.name || "________________"}`, 10, 60); 
    doc.text(`Date of Birth: ${data.dob || "________________"}`, 10, 70);

    doc.text(`Phone Number: ${data.phoneNumber || "________________"}`, 10, 80);
    doc.text(`Address: ${data.address || "________________"}`, 10, 90);

    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text('History:', 10, 110); 
    doc.setFontSize(12);
    doc.rect(10, 115, 190, 20); 
    doc.text(`${data.history || "________________"}`, 12, 120, { maxWidth: 186 }); 

    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text('Examination:', 10, 145); 
    doc.setFontSize(12);
    doc.rect(10, 150, 190, 20); 
    doc.text(`${data.examination || "________________"}`, 12, 155, { maxWidth: 186 });

    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text('Management Plan:', 10, 180); 
    doc.setFontSize(12);
    doc.rect(10, 185, 190, 20); 
    doc.text(`${data.managementplan || "________________"}`, 12, 190, { maxWidth: 186 });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Doctor Name: ${data.doctorName || "________________"}`, 10, 240);
    doc.text(`IMC Number: ${data.imcNumber || "________________"}`, 10, 250);
    doc.text(`Date: ${formatDate(data.datee)  || "________________"}`, 10, 270);
    
    //console.log("This is here the doctor signature before function call in pdf generator: ",data.doctor_SIGNATURE)
    //const base64Signature = await getDoctorSignatureBase64(data.doctor_SIGNATURE);
    const base64Signature = data.doctor_SIGNATURE;
    


    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Doctor Signature:", 10, 260);

    if (base64Signature) {
      // Extract the MIME type dynamically from the Base64 string
      const mimeType = base64Signature.match(/^data:(image\/[a-zA-Z]+);base64,/);
      const imageType = mimeType ? mimeType[1].split("/")[1].toUpperCase() : 'PNG'; // Default to 'PNG'

      doc.addImage(base64Signature, imageType, 50, 250, 25, 15); // Dynamically use image type
    } else {
      doc.text("Doctor Signature: _________________", 10, 260);
    }


    const pdfBlob = doc.output('blob');
    resolve(pdfBlob); 
  };
});
};