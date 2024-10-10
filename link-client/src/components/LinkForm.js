import React, { useState, useEffect } from 'react';
import { platformLinks } from '../utils/PlatformLink';
import axios from 'axios';
import ToastNotifications, {
	showSuccessToast,
	showErrorToast,
} from '../utils/ToastNotifications';
import { useUserProfile } from '../authentication/UserProfileContext';
import { useAuth } from '../authentication/AuthContext';
import NewLink from './NewLink';

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
	useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, children }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		cursor: isDragging ? 'grabbing' : 'grab',
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="mb-4 p-4 bg-gray-100 rounded-lg flex items-center"
		>
			<div
				className="flex-shrink-0 mr-4 cursor-move"
				{...attributes}
				{...listeners}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 8h16M4 16h16"
					/>
				</svg>
			</div>
			{children}
		</div>
	);
};
const LinkForm = () => {
	const [newLink, setNewLink] = useState({ platform: '', url: '' });
	const [isAdding, setIsAdding] = useState(false);
	const [editingLink, setEditingLink] = useState(null);
	const { userProfile, fetchUserProfile } = useUserProfile();
	const { token } = useAuth();
	const [links, setLinks] = useState([]);

	useEffect(() => {
		if (userProfile && userProfile.links) {
			setLinks(userProfile.links);
		}
	}, [userProfile]);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleAddNewLink = () => {
		setIsAdding(true);
		setNewLink({ platform: platformLinks[0].platform, url: '' });
	};

	const isValidUrl = (url) => {
		try {
			new URL(url);
			return true;
		} catch (e) {
			return false;
		}
	};

	// Submit new or edited link
	const handleSubmit = async () => {
		if (!newLink.platform || !newLink.url) {
			showErrorToast('Both platform and URL are required!');
			return;
		}
		if (!isValidUrl(newLink.url)) {
			showErrorToast('Please enter a valid URL');
			return;
		}

		try {
			const linkPayload = {
				icon: null,
				shortName: newLink.platform,
				originalUrl: newLink.url,
			};

			// If editing, update the link; otherwise, create a new one
			if (editingLink) {
				await axios.put(
					`http://localhost:8000/api/links/${editingLink._id}`,
					linkPayload,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				);
				showSuccessToast('Link updated successfully!');
			} else {
				await axios.post('http://localhost:8000/api/links', linkPayload, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});
				showSuccessToast('New link created successfully!');
			}

			setIsAdding(false);
			setEditingLink(null);
			fetchUserProfile();
		} catch (error) {
			showErrorToast(error.response?.data?.error || 'Error saving the link');
		}
	};
	const handleButtonClick = (e, action) => {
		e.stopPropagation(); // Prevent drag event
		action();
	};

	const handleDelete = async (linkId) => {
		console.log('Delete link id: ', linkId);
		try {
			await axios.delete(`http://localhost:8000/api/links/${linkId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			showSuccessToast('Link deleted successfully!');
			fetchUserProfile();
		} catch (error) {
			showErrorToast(error.response?.data?.error || 'Error deleting the link');
		}
	};

	const handleEdit = (link) => {
		setEditingLink(link);
		setNewLink({ platform: link.shortName, url: link.originalUrl });
		setIsAdding(true);
	};

	const handleDragEnd = async (event) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			const oldIndex = links.findIndex((link) => link._id === active.id);
			const newIndex = links.findIndex((link) => link._id === over.id);

			const newLinks = arrayMove(links, oldIndex, newIndex);
			const updatedLinks = newLinks.map((link, index) => ({
				...link,
				order: index,
			}));

			setLinks(updatedLinks);

			try {
				await axios.put(
					'http://localhost:8000/api/links/reorder',
					{ links: newLinks.map((item) => item._id) },
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				);
				showSuccessToast('Links reordered successfully!');
				fetchUserProfile();
			} catch (error) {
				showErrorToast(error.response?.data?.error || 'Error reordering links');
				setLinks([...userProfile.links].sort((a, b) => a.order - b.order));
			}
		}
	};

	return (
		<div className="w-full lg:w-1/2 p-4 bg-white rounded-lg h-[80vh] overflow-auto">
			<h1 className="text-3xl font-bold mb-4">Customize your links</h1>
			<p className="text-gray-600 mb-4">
				Add/edit/remove links and share your profiles!
			</p>

			{isAdding ? (
				<NewLink
					newLink={newLink}
					setNewLink={setNewLink}
					editingLink={editingLink}
					handleSubmit={handleSubmit}
				/>
			) : (
				<button
					onClick={handleAddNewLink}
					className="w-full py-2 mb-4 text-purple-500 border border-purple-500 rounded-lg hover:bg-purple-50"
				>
					+ Add new link
				</button>
			)}

			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={links.map((link) => link._id)}
					strategy={verticalListSortingStrategy}
				>
					{links.length > 0 ? (
						links.map((link, index) => (
							<SortableItem key={link._id} id={link._id}>
								<div className="flex-grow">
									<div className="flex justify-between items-center">
										<span className="font-semibold">Link #{index + 1}</span>
										<div>
											<button
												onClick={(e) =>
													handleButtonClick(e, () => handleDelete(link._id))
												}
												className="text-gray-500 hover:text-red-500 mr-4"
											>
												Delete
											</button>
											<button
												onClick={(e) =>
													handleButtonClick(e, () => handleEdit(link))
												}
												className="text-gray-500 hover:text-blue-500"
											>
												Edit
											</button>
										</div>
									</div>
									<div className="text-gray-700">{link.shortName}</div>
								</div>
							</SortableItem>
						))
					) : (
						<div className="text-gray-500 text-center">No links added yet.</div>
					)}
				</SortableContext>
			</DndContext>

			<ToastNotifications />
		</div>
	);
};

export default LinkForm;
