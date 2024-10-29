import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    email: "yejewa2292@aleitar.com"
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken)

try {
    const {email} = jwt.verify(token, JWT_SECRET);
    console.log(email);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InllamV3YTIyOTJAYWxlaXRhci5jb20iLCJpYXQiOjE3MzAyMTk5NjksImV4cCI6MTczMDMwNjM2OX0.sQat3KLHrbMKsWwqQeW5ZzRmPqHA_V1WATKkRoHRCdd";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}