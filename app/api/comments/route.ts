// app/api/comments/route.ts
import { transporter } from "../../../tools/mail";
import { client } from "../../../tools/sanity/client";
import { NextRequest, NextResponse } from "next/server";

interface CommentRequestBody {
  name: string;
  email: string;
  comment: string;
  postId: string;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, comment, postId }: CommentRequestBody =
      await req.json();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sending to yourself
      subject: `a new comment from ${name}`,
      text: `
          Name: ${name}
          Email: ${email}
          Comment: ${comment}
        `,
      html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Comment:</strong> ${comment}</p>
        `,
    };

    await client.create({
      _type: "comment",
      name,
      email,
      comment,
      post: { _type: "reference", _ref: postId },
    });

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Comment submitted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to submit comment", error: err },
      { status: 500 }
    );
  }
}
