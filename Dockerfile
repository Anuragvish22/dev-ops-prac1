# Use an Nginx image to serve static files
FROM nginx:alpine

# Copy your static files to Nginx's html folder
COPY . /usr/share/nginx/html

# Expose port 80 to access the website
EXPOSE 80


              