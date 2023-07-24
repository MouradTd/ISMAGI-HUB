const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
var fs = require('fs');
const jsonParser = bodyParser.json();
const cors = require('cors');
app.use(jsonParser);
let Vimeo = require('vimeo').Vimeo;
const cloudinary = require('cloudinary').v2;
var fileupload = require("express-fileupload");
const { type } = require('os');
const { log } = require('console');
app.use(fileupload({ useTempFiles: true }))


// This file will handle connection logic to the MongoDB database


mongoose.set('strictQuery', false);


mongoose.connect('') // Connection To DB String
  .then(() => {
    console.log("Connected successfully")
  })
  .catch((err) => {
    console.error(`Error connecting to the database. ${err}`)
  })



app.use(cors());




const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
 
  type: {
    type: mongoose.Schema.Types.Mixed,
    default: [],
    module: {
      type: String
    }
  }
  
});
const User = mongoose.model('User', userSchema);

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  professor: {
    type: mongoose.Schema.Types.String,
    ref: 'Professor'
  },
 
  url: {
    type: String,
    required: true
  },

});

const Course = mongoose.model('Course', courseSchema);

const classeSchema = new mongoose.Schema({
  id_etudiant: {
    required: true, type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  id_prof: {
    required: true, type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  Nom_classe: {
    type: String,
    required: true
  },

});
const Classe = mongoose.model('Classe', classeSchema);

const noteSchema = new mongoose.Schema({
  Note: {
    type: Number,
    required: true
  },
  professor: {
    type: String,
    ref: 'Professor',
    required: true
  },
  etudiant: {
    type: String,
    ref: 'User',
    required: true
  },
  Module: {
    type: String,
    required: true
  },
  classe: {
    type: String,
    ref: 'Classe',
    required: true
  },
  date_exam: {
    type: String,
    required: true
  },
  url_exam_file: {
    type: String,
    required: true
  },


});

const Note = mongoose.model('Note', noteSchema);


const lessonsSchema = new mongoose.Schema({

  id_prof: {
    required: true, type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  Nom_classe: {
    required: true, type: String,
    ref: 'Classe.Nom_classe'
  },
  Nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url_lesson_file: {
    type: String,
    required: true
  },
  Module: {
    type: String,
    required: true
  }


});

const Lessons = mongoose.model('Lessons', lessonsSchema);

const hubSchema = new mongoose.Schema({

  id_etudiant: {
    required: true, type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  Nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url_lesson_file: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }



});

const Hub = mongoose.model('Hub', hubSchema);


const bookmarkSchema = new mongoose.Schema({

  id_utilisateur: {
    required: true, type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  id_course: {
    required: true, type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },

});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);


const playlistSchema = new mongoose.Schema({

  url_video_playlist: [
    {
      type: String,
      required: true
    }
  ],

  id_course: {
    required: true, type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },

});

const Playlist = mongoose.model('Playlist', playlistSchema);
//Routes


app.get('', (req, res) => {

})

// Login post
app.post('/login', jsonParser, async (req, res) => {

  try {
    await User.findOne({ email: req.body.email, password: req.body.password })
      .then((doc) => {
        // res.send(doc)
        if (doc) {

          res.send(doc);
        } else {
          res.json("User Not Found or incorrect credientels");
        }
      })
  } catch (err) {
    console.log(err);
  }
})

// Sigup post
app.post('/signup', async (req, res) => {

  let user = new User(req.body);
  try {
    if (req.body.type === "prof") {
      let user = new User(req.body.insert_array);
      const result = await user.save()
        .then((doc) => res.status(201).json(doc))
        .catch(err => {
          res.status(500).json({
            error: err,
            success: false
          });
        })

    }
    else {

      const check = await User.findOne({ email: req.body.email });

      if (check) {
        res.json(' User already exists')
      } else {
        // res.json(' User Not Found')
        // await User.insertMany([data])
        user.save()
          .then((doc) => res.status(201).json(doc))
          .catch(err => {
            res.status(500).json({
              error: err,
              success: false
            });
          })
      }
    }
    // user.save().then((doc) => res.status(201).json(doc))
    //   .catch(err => { console.log(err); })

  } catch (err) {
    console.log(err);
  }
})


app.patch('/updateuser/:id', (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, {
    $set: req.body
  }, { returnOriginal: false },
  ).then((updateddoc) => {
    res.send(updateddoc)
  }).catch((err) => { console.log("les informations que vous avez saisis existe deja dans la base de données") })
})



app.post('/upload', async (req, res) => {


  const upload = req.files.video;




  // Configuration 
  cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
  });


  // Upload


  const file = cloudinary.uploader.upload(upload.tempFilePath, { public_id: `${Date.now()}`, resource_type: 'video' })

  file.then((data) => {
    // console.log(data);
    // res.send(data);
    console.log(data.secure_url);
    let course = new Course({
      title: req.body.title,
      description: req.body.description,
      professor: req.body.professor,
      url: data.secure_url
    })
    course.save()
      .then((doc) => res.status(201).json(doc))
      .catch(err => {
        res.status(500).json({
          error: err,
          success: false
        });
      })
    console.log(course);
  }).catch((err) => {
    console.log(err);
  });




})

app.get('/course', async (req, res) => {

  const course = await Course.find();
  if (!course) {
    res.status(500).json({ success: false })
  }
  res.send(course);
})

app.post('/onecourse', jsonParser, async (req, res) => {
  try {
    await Course.findOne({ _id: req.body.id })
      .then((doc) => {
        // res.send(doc)
        if (doc) {

          res.send(doc);
        } else {
          res.json("Error");
        }
      })
  } catch (err) {
    console.log(err);
  }
})

app.post('/ownercourse', jsonParser, async (req, res) => {
  try {
    await Course.find({ professor: req.body.professor }, { returnOriginal: false })
      .then((doc) => {
        // res.send(doc)
        if (doc) {

          res.send(doc);
        } else {
          res.json("Error");
        }
      })
  } catch (err) {
    console.log(err);
  }
})

app.patch('/updatecourse/:id', (req, res) => {
  Course.findByIdAndUpdate({ _id: req.params.id }, {
    $set: req.body
  }, { returnOriginal: false },
  ).then((updateddoc) => {
    // res.send({"message":"Modifier avec success"});
    res.send(updateddoc)
  }).catch((err) => { console.log(err) })
})

app.post('/random', (req, res) => {
  Course.aggregate([{ $sample: { size: 4 } }]).then((docs) => {
    res.send(docs)
  })
})

app.get('/students', async (req, res) => {

  const course = await User.find({ type: "user" });
  if (!course) {
    res.status(500).json({ success: false })
  }
  res.send(course);
})

app.get('/profs', async (req, res) => {
  const desiredType = "prof";

  // Assuming your data is stored in a variable named "users"
  const foundUser = await User.find({ 'type.type': desiredType }).exec();

  if (foundUser) {
    // User with the desired type "prof" is found
    res.json(foundUser);
  } else {
    // User with the desired type is not found
    res.status(404).json({ message: "User not found" });
  }
});

app.post('/addclasse', async (req, res) => {
  try {
    const check = await Classe.findOne({ Nom_classe: req.body.Nom_classe });

    if (check) {
      res.json('Classe already exists');
    } else {
      // req.body contains the array of objects to insert into db
      const result = await Classe.insertMany(req.body.insert_array);

      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      success: false
    });
  }
});

app.get('/classes', async (req, res) => {

  const classe = await Classe.find().populate('id_etudiant').populate('id_prof');
  if (!classe) {
    res.status(500).json({ success: false })
  }
  res.send(classe);
})
app.get('/classe', async (req, res) => {

  const classe = await Classe.distinct('Nom_classe');
  if (!classe) {
    res.status(500).json({ success: false })
  }
  res.send(classe);
})

app.get('/lessons', async (req, res) => {

  const lessons = await Lessons.find().populate('id_prof');
  if (!lessons) {
    res.status(500).json({ success: false })
  }
  res.send(lessons);
})



app.get('/name/:id', async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .then((doc) => {
      // res.send(doc)
      if (doc) {

        res.send(doc);
      } else {
        res.json("Error Not Found");
      }
    }).catch((err) => { res.json("Error Not Found") })
})
app.get('/exam/:id', async (req, res) => {

  try {
    const note = await Note.find({ etudiant: req.params.id });

    if (note.length === 0) {
      return res.status(404).json('Not found');
    }

    res.send(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.post('/note', async (req, res) => {

  //
  const upload = req.files.exam_file;




  // Configuration 
  cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
  });


  // Upload


  const file = cloudinary.uploader.upload(upload.tempFilePath, { public_id: `${Date.now()}`, resource_type: 'auto' })

  file.then((data) => {
    // console.log(data);
    // res.send(data);
    console.log(data.secure_url);
    let note = new Note({
      Note: req.body.Note,
      professor: req.body.professor,
      etudiant: req.body.etudiant,
      url_exam_file: data.secure_url,
      Module: req.body.Module,
      classe: req.body.classe,
      date_exam: req.body.date_exam,
    })
    note.save()
      .then((doc) => res.status(201).json(doc))
      .catch(err => {
        res.status(500).json({
          error: err,
          success: false
        });
      })

    console.log(note);
  }).catch((err) => {
    console.log(err);
  });


})

app.post('/upload_lesson', async (req, res) => {

  const upload = req.files.lesson_file;

  // Configuration 
  cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
  });

  // Upload

  const file = cloudinary.uploader.upload(upload.tempFilePath, { public_id: `${Date.now()}`, resource_type: 'auto' })

  file.then((data) => {
    console.log(data.secure_url);
    let lesson = new Lessons({
      id_prof: req.body.id_prof,
      Nom_classe: req.body.Nom_classe,
      Nom: req.body.Nom,
      url_lesson_file: data.secure_url,
      description: req.body.description,
      Module: req.body.Module
    })
    lesson.save()
      .then((doc) => res.status(201).json(doc))
      .catch(err => {
        res.status(500).json({
          error: err,
          success: false
        });
      })
    console.log(lesson);
  }).catch((err) => {
    console.log(err);
  });
})

app.delete('/delete_course/:id', async (req, res) => {

  cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
  });
  // const course = await Course.find({_id:req.params.id}  );
  const course = await Course.findById(req.params.id);
  const url = course.url;
  const fileName = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
  console.log(fileName);
  const delete_file = cloudinary.uploader.destroy(fileName, { resource_type: 'video' })
    .then(async (result) => {
      console.log(result)
      const coursedelete = await Course.findByIdAndDelete(req.params.id)
        .then((doc) => {
          res.status(201).json('Deleted succesfully')
        })
    })
})


app.post('/upload/lesson/hub', async (req, res) => {

  const upload = req.files.lesson_file;

  // Configuration 
  cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
  });

  // Upload

  const file = cloudinary.uploader.upload(upload.tempFilePath, { public_id: `${Date.now()}`, resource_type: 'auto' })

  file.then((data) => {
    // console.log(data);
    // res.send(data);
    console.log(data.secure_url);
    let hub = new Hub({
      id_etudiant: req.body.id_etudiant,
      Nom: req.body.Nom,
      url_lesson_file: data.secure_url,
      description: req.body.description,
      status: req.body.status,
    })
    hub.save()
      .then((doc) => res.status(201).json(doc))
      .catch(err => {
        res.status(500).json({
          error: err,
          success: false
        });
      })
    console.log(hub);
  }).catch((err) => {
    console.log(err);
  });
})

app.get('/pending_uploads', async (req, res) => {
  const pendingUploads = await Hub.find().populate('id_etudiant');

  if (pendingUploads) {
    // User with the desired type "prof" is found
    res.json(pendingUploads);
  } else {
    // User with the desired type is not found
    res.status(404).json({ message: "No pending uploads" });
  }
})

app.patch('/updateHub/:id', (req, res) => {
  Hub.findByIdAndUpdate({ _id: req.params.id }, {
    $set: req.body
  }, { returnOriginal: false },
  ).then((updateddoc) => {
    // res.send({"message":"Modifier avec success"});
    res.send(updateddoc)
  }).catch((err) => { console.log(err) })
})

app.delete('/delete_Hub/:id', async (req, res) => {

  cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
  });
  // const course = await Course.find({_id:req.params.id}  );
  const hub = await Hub.findById(req.params.id);
  const url = hub.url_lesson_file;
  const fileName = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
  console.log(fileName);
  const delete_file = cloudinary.uploader.destroy(fileName)
    .then(async (result) => {
      console.log(result)
      const hubdelete = await Hub.findByIdAndDelete(req.params.id)
        .then((doc) => {

          res.status(201).json('Deleted succesfully')
        })
    })
  //res.send(fileName);
})

app.get('/hub/uploads/:id', async (req, res) => {

  const hub = await Hub.find({ id_etudiant: req.params.id }).populate('id_etudiant');
  if (!hub) {
    res.status(500).json({ success: false })
  }
  res.send(hub);
})

app.get('/Hub', async (req, res) => {
  const ValidatedUploads = await Hub.find({ status: 'Valider' }).populate('id_etudiant');

  if (ValidatedUploads) {
    // User with the desired type "prof" is found
    res.json(ValidatedUploads);
  } else {
    // User with the desired type is not found
    res.status(404).json({ message: "No validated uploads" });
  }
})


app.get('/uploaded_gif/:id', async (req, res) => {
  const video = await Course.findById(req.params.id);
  var originalURL = video.url;

  // Extract the dynamic section from the URL
  var regex = /\/v(\d+)\//;
  var match = originalURL.match(regex);
  if (match) {
    var dynamicSection = match[0];

    // Replace the dynamic section with the desired value
    var modifiedURL = originalURL.replace(dynamicSection, '/c_scale,h_180,w_300/e_loop/dl_200,vs_40/');

    // Change the file extension to ".gif"
    modifiedURL = modifiedURL.replace('.mp4', '.gif');

    res.send(modifiedURL);
  } else {
    // Handle case when the dynamic section is not found
    res.status(400).send('Invalid URL');
  }
});

app.get('/get/lessons/:id', async (req, res) => {

  const lessons = await Lessons.find({ id_prof: req.params.id });
  if (!lessons) {
    res.status(500).json({ success: false })
  }
  res.send(lessons);
})

app.delete('/delete_lesson/:id', async (req, res) => {

  cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
  });
  // const course = await Course.find({_id:req.params.id}  );
  const lesson = await Lessons.findById(req.params.id);
  const url = lesson.url_lesson_file;
  const fileName = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
  console.log(fileName);
  const delete_file = cloudinary.uploader.destroy(fileName)
    .then(async (result) => {
      console.log(result)
      const lessondelete = await Lessons.findByIdAndDelete(req.params.id)
        .then((doc) => {

          res.status(201).json('Deleted succesfully')
        })
    })
  //res.send(fileName);
})

app.post('/bookmarks', (req, res) => {
  let bookmark = new Bookmark({
    id_utilisateur: req.body.id_utilisateur,
    id_course: req.body.id_course,
  })

  Bookmark.findOne({ id_utilisateur: req.body.id_utilisateur, id_course: req.body.id_course })
    .then((bookmark_repo) => {
      if (bookmark_repo) {
        res.json('Course already bookmarked');
      } else {
        bookmark.save()
          .then((doc) => res.status(201).json(doc))
          .catch((err) => {
            res.status(500).json({
              error: err,
              success: false,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
})

app.get('/getBookmarks/:id', async (req, res) => {
  const bookmarks = await Bookmark.find({ id_utilisateur: req.params.id }).populate('id_course');
  if (!bookmarks) {
    res.status(500).json({ success: false })
  }
  res.send(bookmarks);
})


app.post('/upload_playlist', async (req, res) => {
  cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
  });

  const uploads = req.files['playlist[]'];
  const videoUrls = [];
  const id_course = req.body.id_course;


  for (let i in uploads) {
    const result = await cloudinary.uploader.upload(uploads[i].tempFilePath, { public_id: `${Date.now()}`, resource_type: 'video' });

    videoUrls.push(result.secure_url);
    console.log('uploaded');


  }
  let playlist = new Playlist({
    id_course: id_course,
    url_video_playlist: videoUrls,

  })
  playlist.save()
    .then((doc) => res.status(201).json(doc))
    .catch(err => {
      res.status(500).json({
        error: err,
        success: false
      });
    })
  console.log(videoUrls);

});
app.get('/playlist/:id', async (req, res) => {
  const playlist = await Playlist.find({ id_course: req.params.id });
  if (!playlist) {
    res.status(500).json({ success: false })
  }
  res.send(playlist);
})

app.delete('/delete/bookmark/:id', async (req, res) => {
  try {
    
        const bookmark = await Bookmark.findByIdAndDelete(req.params.id)
          .then((doc) => {

            res.status(201).json('Deleted succesfully')
          }).catch((err) => {res.status(500).json('Error')})
      
  } catch (error) {

  }
})

app.listen(3000, () => {
  console.log('Server Runing on port 3000');
})