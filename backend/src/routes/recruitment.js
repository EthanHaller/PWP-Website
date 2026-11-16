const express = require("express")
const router = express.Router()
const { doc, getDoc, updateDoc } = require("../firestore")
const { db } = require("../../netlify/functions/firebase-config")

const getRecruitmentInfo = async (req, res) => {
	try {
		const recruitmentDocRef = doc(db, "recruitment", "generalInfo")
		const recruitmentDoc = await getDoc(recruitmentDocRef)

		if (recruitmentDoc.exists()) {
			res.status(200).send(recruitmentDoc.data())
		} else {
			res.status(404).send("No general info found")
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}
router.get("/", getRecruitmentInfo)

const updateRecruitmentInfo = async (req, res) => {
	try {
		const recruitmentData = req.body
		const recruitmentDocRef = doc(db, "recruitment", "generalInfo")

		await updateDoc(recruitmentDocRef, recruitmentData)
		const updatedRecruitmentDoc = await getDoc(recruitmentDocRef)

		res.status(201).send({ ...updatedRecruitmentDoc.data() })
	} catch (error) {
		res.status(500).send(error.message)
	}
}
router.put("/update", updateRecruitmentInfo)

module.exports = router
