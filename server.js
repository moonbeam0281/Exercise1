import express from "express";
import mongoose from "mongoose";

import Faculty from "./models/Faculty.js";
import University from "./models/University.js";

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

mongoose.connect(/*Nemav vere za da configuriram databaza*/"mongodb://localhost:27017/university_app").then(() => console.log("Db connected")).catch(e => console.log(e));

app.get("/faculties", async (req, res) => {
    const faculties = await Faculty.find().populate("university");
    res.render("faculties/index", { faculties });
});

app.get("/faculties/new", async (req, res) => {
    const unvis = await University.find();
    res.render("faculties/form", {
        faculty: null,
        unvis,
        formAction: "/faculties/new"
    });

});

app.post("/faculties/new", async (req, res) => {
    const { name, address, universityId } = req.body;
    await Faculty.create({
        name,
        address,
        university: universityId
    });
    res.redirect("/faculties");
});

app.get("/faculties/:id/edit", async (req, res) => {
    const fac = await Faculty.findById(req.params.id);
    const unis = await University.find();
    res.render("faculties/form", {
        fac,
        unis,
        formAction: `/faculties/${fac._id}/edit`
    });
});

app.post("/faculties/:id/edit", async (req, res) => {
    const { name, address, universityId } = req.body;
    await Faculty.findByIdAndUpdate(req.params.id, {
        name,
        address,
        university: universityId
    });
    res.redirect("/faculties");
});

app.post("/faculties/:id/delete", async (req, res) => {
    await Faculty.findByIdAndDelete(req.params.id);
    res.redirect("/faculties");
});

app.get("/", (req, res) => res.redirect("/faculties"));

const port = 3000;

app.listen(port, () => console.log(`Server running`));