## Photo Gallery 

The app allows it's users to upload photos, create and add to albums, share images via email/whatsapp; and even transform images using the Cloudinary API.
The project was borne out of a frustration using whatsapp to look through old photos. 
Jumping to an old image would often not work on my mac so I was inspired to create the gallery for fun.

Cloudinary was a good option to ensure the optimisation, upload and transformation of images was efficient.
I was able to preload low quality versions of each asset in the gallery to reduce the perceived loading times of images should the user have a large gallery.
This also made the transition to the slideshow view smoother.

The utility-first approach of TailwindCSS allowed me to create and test out a lot of ideas for the UI easily and Framer Motion offered a simple solution to animate the graphically defined components.

Users can securely log in with OAuth credentials from Google, which made sense given that most users will have an Account with Google. Should I make the gallery available for use by the public, I've coded a server that stores user information in a MongoDB database.

For now I've deployed an example of the app to vercel which you can view here: noycephotos.vercel.app 
(although one should note that users do not have the permission to upload photos or create albums in this example version).

Google photos is an excellent example of how an online gallery should be created. To anyone considering building out their own for fun, I found this article
extremely insightful and inspiring: https://medium.com/google-design/google-photos-45b714dfbed1
 




