import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div style={{ 
      backgroundColor: "#000000", 
      color: "#ffffff", 
      fontFamily: "Arial, sans-serif", 
      padding: "40px", 
      borderRadius: "40px", 
      maxWidth: "600px", 
      margin: "0 auto",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    }}>
      <h2 style={{ 
        fontSize: "32px", 
        fontWeight: "bold", 
        letterSpacing: "-0.05em", 
        marginBottom: "10px",
        color: "#ffffff"
      }}>
        New <span style={{ color: "#f87171" }}>Contact Us</span> Submission
      </h2>
      
      <p style={{ color: "#a1a1a1", fontSize: "14px", marginBottom: "32px" }}>
        You received a new message from the college website contact form.
      </p>

      <div style={{ marginBottom: "24px" }}>
        <label style={{ 
          display: "block", 
          fontSize: "10px", 
          color: "rgba(255,255,255,0.5)", 
          textTransform: "uppercase", 
          letterSpacing: "0.1em", 
          marginBottom: "4px" 
        }}>
          Full Name
        </label>
        <div style={{ fontSize: "16px", color: "#ffffff" }}>{name}</div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label style={{ 
          display: "block", 
          fontSize: "10px", 
          color: "rgba(255,255,255,0.5)", 
          textTransform: "uppercase", 
          letterSpacing: "0.1em", 
          marginBottom: "4px" 
        }}>
          Email Address
        </label>
        <div style={{ fontSize: "16px", color: "#ffffff" }}>{email}</div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <label style={{ 
          display: "block", 
          fontSize: "10px", 
          color: "rgba(255,255,255,0.5)", 
          textTransform: "uppercase", 
          letterSpacing: "0.1em", 
          marginBottom: "8px" 
        }}>
          Message
        </label>
        <div style={{ 
          fontSize: "15px", 
          lineHeight: "1.6",
          color: "#ffffff",
          backgroundColor: "rgba(255,255,255,0.05)",
          padding: "20px",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          {message}
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid rgba(255, 255, 255, 0.1)", margin: "24px 0" }} />

      <p style={{ fontSize: "12px", color: "#666", textAlign: "center" }}>
        This message was sent from the college website contact form.
      </p>
    </div>
  );
}