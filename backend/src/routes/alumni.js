const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer()
const { collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc } = require("../firestore")
const { ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage")
const { db, storage } = require("../../netlify/functions/firebase-config")

const getAlumni = async (req, res) => {
	try {
		const alumniCollection = collection(db, "alumni")
		const querySnapshot = await getDocs(alumniCollection)
		const alumni = []

		querySnapshot.forEach((doc) => {
			const alum = { id: doc.id, ...doc.data() }
			alumni.push(alum)
		})

		res.status(200).send(alumni)
	} catch (error) {
		res.status(500).send(error.message)
	}
}
router.get("/", getAlumni)

const getCompanies = async (req, res) => {
	try {
		const companiesCollection = collection(db, "companies")
		const querySnapshot = await getDocs(companiesCollection)
		const companies = []

		querySnapshot.forEach((doc) => {
			const company = { id: doc.id, ...doc.data() }
			companies.push(company)
		})

		res.status(200).send(companies)
	} catch (error) {
		res.status(500).send(error.message)
	}
}
router.get("/companies", getCompanies)

const addAlumni = async (req, res) => {
	try {
		const { name, linkedin } = req.body

		const alumniData = { name, linkedin }

		const alumniCollection = collection(db, "alumni")
		const newAlumniRef = await addDoc(alumniCollection, alumniData)

		const newAlumniDoc = await getDoc(newAlumniRef)

		res.status(201).send({ id: newAlumniRef.id, ...newAlumniDoc.data() })
	} catch (error) {
		res.status(500).send(error.message)
	}
}
router.post("/add", addAlumni)

const updateAlumni = async (req, res) => {
	try {
		const alumniId = req.params.id
		const alumniRef = doc(db, "alumni", alumniId)

		const alumniData = req.body

		await updateDoc(alumniRef, alumniData)
		const updatedAlumniDoc = await getDoc(alumniRef)

		res.status(200).send({ id: alumniId, ...updatedAlumniDoc.data() })
	} catch (error) {
		res.status(500).send(error.message)
	}
}
router.put("/update/:id", updateAlumni)

const deleteAlumni = async (req, res) => {
	try {
		const alumniId = req.params.id
		const alumniRef = doc(db, "alumni", alumniId)

		const alumniDoc = await getDoc(alumniRef)

		if (!alumniDoc.exists()) {
			return res.status(404).send({ message: "Alumni not found" })
		}

		await deleteDoc(alumniRef)

		res.status(200).send({ message: "Alumni deleted successfully" })
	} catch (error) {
		res.status(500).send(error.message)
	}
}
router.delete("/delete/:id", deleteAlumni)

const addCompany = async (req, res) => {
	try {
		const image = req.file
		const { name } = req.body

		if (!image || !name) {
			return res.status(400).send({ message: "Name and image file are required" })
		}

		const fileName = `companies/${Date.now()}-${image.originalname}`
		const storageRef = ref(storage, fileName)

		await uploadBytes(storageRef, image.buffer)

		const imageUrl = await getDownloadURL(storageRef)

		const companyData = { name, imageUrl }

		const companiesCollection = collection(db, "companies")
		const newCompanyRef = await addDoc(companiesCollection, companyData)

		res.status(201).send({ id: newCompanyRef.id, name, imageUrl })
	} catch (error) {
		res.status(500).send(error.message)
	}
}
router.post("/companies/add", upload.single("image"), addCompany)

const updateCompany = async (req, res) => {
	try {
		const companyId = req.params.id
		const companyRef = doc(db, "companies", companyId)

		const { name } = req.body
		let updateData = { name }

		if (req.file) {
			const image = req.file
			const fileName = `companies/${Date.now()}-${image.originalname}`
			const storageRef = ref(storage, fileName)

			await uploadBytes(storageRef, image.buffer)

			const imageUrl = await getDownloadURL(storageRef)
			updateData.imageUrl = imageUrl
		}

		await updateDoc(companyRef, updateData)
		const updatedCompanyDoc = await getDoc(companyRef)

		res.status(200).send({ id: companyId, ...updatedCompanyDoc.data() })
	} catch (error) {
		res.status(500).send(error.message)
	}
}
router.put("/companies/update/:id", upload.single("image"), updateCompany)

const deleteCompany = async (req, res) => {
	try {
		const companyId = req.params.id
		const companyRef = doc(db, "companies", companyId)

		const companyDoc = await getDoc(companyRef)

		if (!companyDoc.exists()) {
			return res.status(404).send({ message: "Company not found" })
		}

		const { imageUrl } = companyDoc.data()
		const filePath = imageUrl.split("/").slice(-1).join("/").split("?")[0].replace("%2F", "/")
		const fileRef = ref(storage, filePath)

		try {
			await getDownloadURL(fileRef)
			await deleteObject(fileRef)
		} catch (error) {
			if (error.code === "storage/object-not-found") {
				console.log("Image does not exist.")
			} else {
				throw error
			}
		}

		await deleteDoc(companyRef)

		res.status(200).send({ message: "Company and associated image deleted successfully" })
	} catch (error) {
		res.status(500).send(error.message)
	}
}
router.delete("/companies/delete/:id", deleteCompany)

module.exports = router
