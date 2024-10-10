import React from 'react';
import { platformLinks } from '../utils/PlatformLink';

const NewLink = ({ newLink, setNewLink, editingLink, handleSubmit }) => {
	return (
		<>
			<div className="mb-4 p-4 bg-gray-50 rounded-lg">
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Platform
					</label>
					<select
						value={newLink.platform}
						onChange={(e) =>
							setNewLink({ ...newLink, platform: e.target.value })
						}
						className="w-full p-2 border rounded-lg"
					>
						{platformLinks.map((value, idx) => (
							<option key={idx} value={value.platform}>
								{value.platform}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Link
					</label>
					<input
						type="text"
						value={newLink.url}
						onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
						className="w-full p-2 border rounded-lg"
						placeholder="https://www.example.com/username"
					/>
				</div>
				<button
					onClick={handleSubmit}
					className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
				>
					{editingLink ? 'Update Link' : 'Save'}
				</button>
			</div>
		</>
	);
};
export default NewLink;
