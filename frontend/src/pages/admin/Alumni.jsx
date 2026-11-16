import React, { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "../../components/ui/use-toast"
import { Toaster } from "../../components/ui/toaster"
import { MdEdit, MdDelete, MdAdd } from "react-icons/md"
import Error from "../../components/Error"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../../components/ui/dialog"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../../components/ui/dropdown-menu"
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/ui/table"
import { FaEllipsis } from "react-icons/fa6"
import compressFile from "../../utils/compressFile"

const fetchAlumni = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alumni`)
	return response.data
}

const fetchCompanies = async () => {
	const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/alumni/companies`)
	return response.data
}

const AddCompanyModal = ({ open, onOpenChange }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const [formData, setFormData] = useState({
		name: "",
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleFileChange = (e) => {
		setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }))
	}

	const mutation = useMutation({
		mutationFn: async (data) => {
			const formData = new FormData()
			formData.append("name", data.name)
			formData.append("image", await compressFile(data.image, 1.5 * 1024 * 1024))
			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/alumni/companies/add`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["companies"])
			toast({
				title: "Success",
				description: "Company added successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			let message = "Failed to add Company"
			if (err.message.startsWith("Cannot compress image")) {
				message = "File size too large"
			}
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!formData.name || !formData.image) {
			return toast({
				title: "Error",
				description: "Name and Image are required",
				variant: "destructive",
				duration: 2000,
			})
		}
		mutation.mutate(formData)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Add Company Modal">
				<DialogTitle>Add Company</DialogTitle>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="add-name" className="block text-card-foreground">
							Name
						</Label>
						<Input id="add-name" type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full" />
					</div>
					<div>
						<Label htmlFor="add-image" className="block text-card-foreground">
							Image
						</Label>
						<Input id="add-image" type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
					</div>
					<DialogFooter>
						<Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="px-4 py-2 rounded">
							Cancel
						</Button>
						<Button disabled={!formData.name || !formData.image} type="submit" className="px-4 py-2 rounded">
							Add
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

const EditCompanyModal = ({ open, onOpenChange, company }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const [formData, setFormData] = useState({
		name: company?.name || "",
	})

	useEffect(() => {
		if (company) {
			setFormData({
				name: company?.name || "",
			})
		}
	}, [company])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleFileChange = (e) => {
		setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }))
	}

	const mutation = useMutation({
		mutationFn: async ({ originalId, companyData }) => {
			const formData = new FormData()
			formData.append("name", companyData.name)
			formData.append("image", await compressFile(companyData.image, 1.5 * 1024 * 1024))
			const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/alumni/companies/update/${originalId}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["companies"])
			toast({
				title: "Success",
				description: "Company updated successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			let message = "Failed to update Company"
			if (err.message.startsWith("Cannot compress image")) {
				message = "File size too large"
			}
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		mutation.mutate({ originalId: company.id, companyData: formData })
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Update Company Modal">
				<DialogTitle>Edit Company</DialogTitle>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="edit-name" className="block text-card-foreground">
							Name
						</Label>
						<Input id="edit-name" type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full" />
					</div>
					<div>
						<Label htmlFor="edit-image" className="block text-card-foreground">
							Image
						</Label>
						<Input id="edit-image" type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
					</div>
					<DialogFooter>
						<Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="px-4 py-2 rounded">
							Close
						</Button>
						<Button type="submit" className="px-4 py-2 rounded">
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

const DeleteCompanyModal = ({ open, onOpenChange, company }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (companyId) => {
			const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/alumni/companies/delete/${companyId}`)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["companies"])
			toast({
				title: "Success",
				description: "Company deleted successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to delete Company",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleDelete = (e) => {
		e.preventDefault()
		mutation.mutate(company.id)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Delete Company Modal">
				<DialogTitle>Delete Company</DialogTitle>
				<p>Are you sure you want to delete {company?.name}?</p>
				<DialogFooter>
					<Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="px-4 py-2 rounded">
						Cancel
					</Button>
					<Button type="button" variant="destructive" onClick={handleDelete} className="px-4 py-2 rounded">
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const AddAlumniModal = ({ open, onOpenChange }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const [formData, setFormData] = useState({
		name: "",
		linkedin: "",
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const mutation = useMutation({
		mutationFn: async (data) => {
			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/alumni/add`, data)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["alumni"])
			toast({
				title: "Success",
				description: "Alumni added successfully!",
				variant: "success",
				duration: 2000,
			})
			onOpenChange(false)
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to add Alumni",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		mutation.mutate(formData)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Add Alumni Modal">
				<DialogTitle>Add Alumni</DialogTitle>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="add-name" className="block text-card-foreground">
							Name
						</Label>
						<Input id="add-name" type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full" required />
					</div>
					<div>
						<Label htmlFor="add-linkedin" className="block text-card-foreground">
							LinkedIn
						</Label>
						<Input
							id="add-linkedin"
							type="text"
							name="linkedin"
							value={formData.linkedin}
							onChange={handleInputChange}
							className="w-full"
							required
						/>
					</div>
					<DialogFooter>
						<Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="px-4 py-2 rounded">
							Cancel
						</Button>
						<Button type="submit" className="px-4 py-2 rounded">
							Add
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

const EditAlumniModal = ({ open, onOpenChange, alumni }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const [formData, setFormData] = useState({
		name: alumni?.name || "",
		linkedin: alumni?.linkedin || "",
	})

	useEffect(() => {
		if (alumni) {
			setFormData({
				name: alumni.name || "",
				linkedin: alumni.linkedin || "",
			})
		}
	}, [alumni])

	const mutation = useMutation({
		mutationFn: async ({ id, alumniData }) => {
			const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/alumni/update/${id}`, alumniData)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["alumni"])
			toast({
				title: "Success",
				description: "Alumni updated successfully!",
				variant: "success",
				duration: 2000,
			})
			onOpenChange(false)
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to update Alumni",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		mutation.mutate({ id: alumni.id, alumniData: formData })
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Edit Alumni Modal">
				<DialogTitle>Edit Alumni</DialogTitle>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="edit-name" className="block text-card-foreground">
							Name
						</Label>
						<Input
							id="edit-name"
							type="text"
							name="name"
							value={formData.name}
							onChange={(e) =>
								setFormData((prevData) => ({
									...prevData,
									name: e.target.value,
								}))
							}
							className="w-full"
							required
						/>
					</div>
					<div>
						<Label htmlFor="edit-linkedin" className="block text-card-foreground">
							LinkedIn
						</Label>
						<Input
							id="edit-linkedin"
							type="text"
							name="linkedin"
							value={formData.linkedin}
							onChange={(e) =>
								setFormData((prevData) => ({
									...prevData,
									linkedin: e.target.value,
								}))
							}
							className="w-full"
							required
						/>
					</div>
					<DialogFooter>
						<Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="px-4 py-2 rounded">
							Cancel
						</Button>
						<Button type="submit" className="px-4 py-2 rounded">
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

const DeleteAlumniModal = ({ open, onOpenChange, alumni }) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: async (alumniId) => {
			const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/alumni/delete/${alumniId}`)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["alumni"])
			toast({
				title: "Success",
				description: "Alumni deleted successfully!",
				variant: "success",
				duration: 2000,
			})
		},
		onError: (err) => {
			console.error(err)
			toast({
				title: "Error",
				description: "Failed to delete Alumni",
				variant: "destructive",
				duration: Infinity,
			})
		},
	})

	const handleDelete = (e) => {
		e.preventDefault()
		mutation.mutate(alumni.id)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby="Delete Alumni Modal">
				<DialogTitle>Delete Alumni</DialogTitle>
				<p>Are you sure you want to delete {alumni?.name}?</p>
				<DialogFooter>
					<Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="px-4 py-2 rounded">
						Cancel
					</Button>
					<Button type="button" variant="destructive" onClick={handleDelete} className="px-4 py-2 rounded">
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const AdminAlumni = () => {
	const {
		data: alumniData,
		isLoading: alumniLoading,
		isError: alumniError,
	} = useQuery({
		queryKey: ["alumni"],
		queryFn: fetchAlumni,
	})
	const {
		data: companiesData,
		isLoading: companiesLoading,
		isError: companiesError,
	} = useQuery({
		queryKey: ["companies"],
		queryFn: fetchCompanies,
	})

	const [isAddAlumniModalOpen, setIsAddAlumniModalOpen] = useState(false)
	const [isEditAlumniModalOpen, setIsEditAlumniModalOpen] = useState(false)
	const [isDeleteAlumniModalOpen, setIsDeleteAlumniModalOpen] = useState(false)
	const [selectedAlumni, setSelectedAlumni] = useState(null)

	const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false)
	const [isEditCompanyModalOpen, setIsEditCompanyModalOpen] = useState(false)
	const [isDeleteCompanyModalOpen, setIsDeleteCompanyModalOpen] = useState(false)
	const [selectedCompany, setSelectedCompany] = useState(null)

	const openEditAlumniModal = (alumni) => {
		setSelectedAlumni(alumni)
		setIsEditAlumniModalOpen(true)
	}

	const openDeleteAlumniModal = (alumni) => {
		setSelectedAlumni(alumni)
		setIsDeleteAlumniModalOpen(true)
	}

	const openEditCompanyModal = (company) => {
		setSelectedCompany(company)
		setIsEditCompanyModalOpen(true)
	}

	const openDeleteCompanyModal = (company) => {
		setSelectedCompany(company)
		setIsDeleteCompanyModalOpen(true)
	}

	if (alumniError || companiesError) {
		return <Error />
	}

	return (
		<div className="container mx-auto px-4">
			<h1 className="text-5xl text-primary font-bold mb-8 pt-16 md:pt-8">Alumni Admin</h1>

			<h2 className="text-3xl mb-4">Companies</h2>
			<div className="flex justify-end mb-4">
				<Button variant="ghost" onClick={() => setIsAddCompanyModalOpen(true)}>
					Add Company <MdAdd className="ml-2" />
				</Button>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
				{companiesLoading
					? Array.from({ length: 6 }).map((_, index) => (
							<Card key={index} className="animate-pulse">
								<CardContent className="h-24"></CardContent>
							</Card>
					  ))
					: companiesData
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((company) => (
								<Card key={company.id} className="bg-white p-4 flex flex-col">
									<CardHeader>
										<img src={company.imageUrl} alt={company.name} className="h-32 object-contain rounded-lg" />
									</CardHeader>
									<CardTitle className="text-card-foreground px-4 pt-4 border-t border-border/30 pb-4">{company.name}</CardTitle>
									<div className="flex-grow"></div>
									<CardFooter className="flex justify-end pt-4 pb-0 px-0 border-t border-border/30">
										<Button
											variant="ghost"
											onClick={() => openDeleteCompanyModal(company)}
											className="text-destructive hover:text-destructive"
										>
											Delete <MdDelete className="ml-2" />
										</Button>
										<Button variant="ghost" onClick={() => openEditCompanyModal(company)} className="text-primary hover:text-primary">
											Edit <MdEdit className="ml-2" />
										</Button>
									</CardFooter>
								</Card>
							))}
			</div>

			<h2 className="text-3xl mb-4">Alumni</h2>
			<div className="flex justify-end mb-4">
				<Button variant="ghost" onClick={() => setIsAddAlumniModalOpen(true)}>
					Add Alumni <MdAdd className="ml-2" />
				</Button>
			</div>
			{alumniLoading ? (
				<p>Loading alumni...</p>
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>LinkedIn</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{alumniData
							.sort((a, b) => {
								const lastNameA = a.name.split(" ").pop().toLowerCase()
								const lastNameB = b.name.split(" ").pop().toLowerCase()
								const lastNameComparison = lastNameA.localeCompare(lastNameB)
								if (lastNameComparison !== 0) return lastNameComparison

								const firstNameA = a.name.split(" ")[0].toLowerCase()
								const firstNameB = b.name.split(" ")[0].toLowerCase()
								return firstNameA.localeCompare(firstNameB)
							})
							.map((alumni) => (
								<TableRow key={alumni.id}>
									<TableCell>{alumni.name}</TableCell>
									<TableCell>
										<a href={alumni.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent-foreground hover:underline">
											{alumni.linkedin}
										</a>
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger>
												<Button variant="ghost" size="icon">
													<FaEllipsis />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem>
													<Button
														variant="ghost"
														onClick={() => openDeleteAlumniModal(alumni)}
														className="text-destructive hover:text-destructive"
													>
														Delete <MdDelete className="ml-2" />
													</Button>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Button
														variant="ghost"
														onClick={() => openEditAlumniModal(alumni)}
														className="text-primary hover:text-primary"
													>
														Edit <MdEdit className="ml-2" />
													</Button>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			)}

			{/* Modals */}
			<AddAlumniModal open={isAddAlumniModalOpen} onOpenChange={setIsAddAlumniModalOpen} />
			<EditAlumniModal open={isEditAlumniModalOpen} onOpenChange={setIsEditAlumniModalOpen} alumni={selectedAlumni} />
			<DeleteAlumniModal open={isDeleteAlumniModalOpen} onOpenChange={setIsDeleteAlumniModalOpen} alumni={selectedAlumni} />

			<AddCompanyModal open={isAddCompanyModalOpen} onOpenChange={setIsAddCompanyModalOpen} />
			<EditCompanyModal open={isEditCompanyModalOpen} onOpenChange={setIsEditCompanyModalOpen} company={selectedCompany} />
			<DeleteCompanyModal open={isDeleteCompanyModalOpen} onOpenChange={setIsDeleteCompanyModalOpen} company={selectedCompany} />

			<Toaster />
		</div>
	)
}

export default AdminAlumni
