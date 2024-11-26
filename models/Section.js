const { default: mongoose, Schema } = require('mongoose');

// Define the Section model schema
const Section = mongoose.model(
  'Section',
  new mongoose.Schema(
    {
      // The title of the section
      title: {
        type: String, // The title must be a string
        // enum: ['sport', 'economy', 'family'], // Allowed values for the title
        required: true, // The title is required
      },
      // The car IDs associated with this section
      carId: {
        type: [Schema.Types.ObjectId], // This field stores an array of ObjectIds
        ref: 'Car', // Refers to the Car model
        required: true, // This field is required
      },
    },
    {
      timestamps: true, // Automatically add createdAt and updatedAt fields
    }
  )
);

// Export the Section model to be used in other parts of the application
module.exports = Section;
