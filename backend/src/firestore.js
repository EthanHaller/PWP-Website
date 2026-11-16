const client = require("firebase/firestore")

// Google Cloud Identity and Access Management (IAM) controls which identities can read and write QA Firestore.
// Production Firestore access follows Firebase Security Rules.
const server = {
	collection: (db, path) => db.collection(path),
	doc: (parent, ...path) => path.length ? parent.doc(path.join("/")) : parent.doc(),
	getDocs: (collection) => collection.get(),
	async getDoc(ref) {
		const snapshot = await ref.get()
		return { exists: () => snapshot.exists, data: () => snapshot.data() }
	},
	addDoc: (collection, data) => collection.add(data),
	updateDoc: (ref, data) => ref.update(data),
	deleteDoc: (ref) => ref.delete(),
	writeBatch: (db) => db.batch(),
}

module.exports = process.env.PWP_ENV === "qa" ? server : client
