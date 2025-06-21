
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OTPEmailRequest {
  email: string;
  otp: string;
  type: 'report' | 'escalate';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, otp, type }: OTPEmailRequest = await req.json();

    if (!email || !otp) {
      throw new Error("Email and OTP are required");
    }

    const subject = type === 'report' ? 
      "OTP for Issue Reporting - DigiPanchayath" : 
      "OTP for Escalation - DigiPanchayath";

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">DigiPanchayath</h1>
          <p style="color: #e0e7ff; margin: 10px 0 0 0;">Digital Governance Platform</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #374151; margin-bottom: 20px;">Email Verification Required</h2>
          
          <p style="color: #6b7280; margin-bottom: 20px;">
            We've received a request to ${type === 'report' ? 'submit an issue report' : 'escalate a complaint'} using this email address.
          </p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="color: #374151; margin-bottom: 10px; font-weight: bold;">Your verification code is:</p>
            <div style="font-size: 32px; font-weight: bold; color: #6366f1; letter-spacing: 4px; font-family: monospace;">
              ${otp}
            </div>
          </div>
          
          <p style="color: #6b7280; margin: 20px 0;">
            This code will expire in 10 minutes. Please enter this code in the DigiPanchayath application to verify your email address.
          </p>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              If you didn't request this verification, you can safely ignore this email.
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
              This is an automated email from DigiPanchayath. Please do not reply to this email.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p>© 2024 DigiPanchayath. All rights reserved.</p>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "DigiPanchayath <noreply@resend.dev>",
      to: [email],
      subject: subject,
      html: htmlContent,
    });

    console.log("OTP email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "OTP sent successfully",
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-otp-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
