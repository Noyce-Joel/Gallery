# Photo Gallery

A dynamic and interactive photo gallery web application that allows users to upload, store, and view photos. Users can create albums, add photos, and experience their collections in both 2D and immersive 3D environments.

## Features

### Photo Upload and Storage

- **Cloud-Based Storage**: Securely upload and store your photos using Cloudinary.
- **Album Management**: Create albums to organize your photos efficiently.

### Masonry Grid Display

- **Responsive Design**: Photos are displayed in a masonry grid layout, ensuring a visually appealing arrangement regardless of the image dimensions.
![Page Image](/public/page.jpeg)

### Select Mode

- **Bulk Actions**: Select multiple photos to perform actions such as viewing enlarged versions, adding to albums, or deleting.
- **User-Friendly Interface**: Intuitive controls for managing large collections of photos.

![Page Image](/public/gallery1.png)

### Discovery Mode

- **Enhanced Engagement**: This design encourages users to focus on each photo individually, creating a more immersive viewing experience. Photo frames are initially displayed empty; hovering over them reveals the photo.

![Page Image](/public/gallery2.png)

### 3D Gallery Mode

- **Matrix Carousel Display**: View your album photos in a 3D matrix, offering a unique perspective.

![Page Image](/public/gallery3.png)
![Page Image](/public/gallery4.png)

- **Keyboard Navigation**: Use arrow keys to navigate through the matrix effortlessly.
- **Zoom Functionality**: Zoom in on images to see details, with the curved mesh material flattening upon zoom for a better view.

![Page Image](/public/gallery5.png)

### Light and Dark Mode

- **Theme Toggle**: Switch between light and dark modes to suit your viewing preference.
- **Consistent Aesthetics**: The UI adapts seamlessly to the selected theme.

![Page Image](/public/gallery.png)

### Animations

- **Smooth Transitions**: Enjoy fluid animations that enhance the user experience without compromising performance.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```
2. **Navigate to the Project Directory**
   ```bash
   cd your-repo-name
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Configure Environment Variables**
   - Create a `.env` file in the root directory.
   - Add your Cloudinary API credentials:
     ```
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```
5. **Run the Application**
   ```bash
   npm start
   ```
6. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`.

## Future Improvements

- **Migration to AWS S3**: Plans to move from Cloudinary to AWS S3 for better control over storage and to overcome API usage limits.
- **Performance Enhancements**: Optimize image loading times and overall application performance.
- **Feature Expansion**: Add social sharing options and user collaboration features.
