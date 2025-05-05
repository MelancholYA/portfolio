// app/api/comments/route.ts
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

    console.log(postId);

    console.log(process.env.NEXT_PUBLIC_SANITY_TOKEN);
    await client.create({
      _type: "comment",
      name,
      email,
      comment,
      post: { _type: "reference", _ref: postId },
    });

    return NextResponse.json({ message: "Comment submitted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to submit comment", error: err },
      { status: 500 }
    );
  }
}
