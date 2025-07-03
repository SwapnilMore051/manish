import { useState } from 'react';
import './about.scss';

const About = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState<number[]>([]);

  const toggleDescription = (index: number) => {
    setExpandedDescriptions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const projects = [
    {
      project: "Alyad Palyad",
      cover_image: "/assets/icons/alyad-palyad.jpg",
      description: "Alyad Palyad is Marathi (Horror-Comedy) movie. I worked on this movie as a FOLEY ARTIST.",
      link: "https://www.imdb.com/title/tt32317640/"
    },
    {
      project: "Khichdi Bhat",
      cover_image: "/assets/icons/khichdi-bhat.jpg",
      description: "A marathi short film for Film Festival. I worked as Foley Artist.",
    },
    {
      project: "Navacha Dakhla",
      cover_image: "/assets/icons/navacha-dakhla.jpg",
      description: "A marathi Web Series.",
      link: "https://youtu.be/PUammeKKHl8?si=A1GsClIcM_rKiZJb",
    },
    {
      project: "Sakhrrech Zaad",
      cover_image: "/assets/icons/sakhrrech-zaad.jpg",
      description: "Sakhrech Zaad was marathi short film, which was made for Film Festival.",
    },
    {
      project: "Mrudgandha",
      cover_image: "/assets/icons/mrudgandha.jpg",
      description: "A marathi short film for film festival. I worked as Foley Artist.",
    },
    {
      project: "Souled Out",
      cover_image: "/assets/icons/souled-out.jpg",
      description: "Marathi Web Series (Horror) on VDOJAR app.",
      link: "https://vdojar.com/Web/show_detail/32/1/5/58/souled-out"
    },
    {
      project: "Maitar",
      cover_image: "/assets/icons/maitar.jpg",
      description: "'Maitar' is an Instagram Reel web series. I worked on this short-form series as an Assistant Recordist.",
      link: "https://www.instagram.com/reel/DLoZRCgPMVR/?igsh=MTJzejRld2FxcmR3bQ=="
    },
    {
      project: "Avtarla Sai",
      cover_image: "/assets/icons/sai.jpg",
      description: "As an assistant recordist for devotional songs, I helped capture the spiritual essence of each piece. My work involved setting up equipment, managing audio levels, and assisting in mixing to create high-quality recordings that inspire and uplift listeners. Each session was a meaningful collaboration that brought sacred music to life.",
      link: "https://youtu.be/K53vY4S8iL4?si=28wfd8wi4c4E0Xws"
    },
    {
      project: "Bhaktanchya Hakela Tu Kadhi Gela Ka Re Deva",
      cover_image: "/assets/icons/bhakt.jpeg",
      description: "As an assistant recordist on this devotional track dedicated to Lord Vitthal, I helped ensure the recording captured the song’s spiritual essence and melodic purity, contributing to its inspiring and uplifting quality.",
      link: "https://youtu.be/4_9klw7Qobc?si=WBIsKNeWlM4WkNiO"
    },
    {
      project: "Swami Tumhi Sarkar",
      cover_image: "/assets/icons/swami.jpeg",
      description: "In this devotional song dedicated to Sant Swami Samarth, I had the opportunity to contribute as an assistant recordist. The track beautifully captures the essence of Sant Swami Samarth's teachings and spiritual presence. My role involved supporting the recording process, ensuring the technical quality of the sound, and assisting in the overall production to bring out the song’s devotional and melodic essence.",
      link: 'https://youtu.be/LufYFH_gaAs?si=an3DzRdYjcT_lJHv'
    },
    {
      project: "WOT MUZIC'S Podcast (Maifil)",
      cover_image: "/assets/icons/maifil1.jpg",
      description: "In this podcast, I worked as an assistant recordist, ensuring top-notch audio quality for engaging discussions on Morya Morya song. Their role was key in delivering a clear and professional listening experience.",
      link: "https://youtu.be/LqIR6xY4pjY?si=OHW54vZV3Q4Z49Er"
    },
    {
      project: "WOT MUZIC'S Podcast (Maifil)",
      cover_image: "/assets/icons/maifil2.jpg",
      description: 'I worked as an assistant sound recordist on WOT MUZIC’S podcast, where the singer/composer and lyricist of the Marathi devotional song "Swami Tumi Sarkar" was invited. The episode explored the inspiration and creative journey behind the song, and my role ensured high-quality audio capture of this insightful and spiritual conversation.',
      link: "https://youtu.be/X2xWrCtIAh4?si=GITIo1BZtKMVsq-f"
    },
    {
      project: "WOT MUZIC'S Podcast (Maifil)",
      cover_image: "/assets/icons/maifil3.jpg",
      description: "Assisted in recording and managing audio for WOT MUZIC’s podcast featuring the devotional track ‘Avtarla Sai.’ Responsibilities included setting up and monitoring recording equipment, ensuring clear and high-quality sound capture, and supporting the post-production team to maintain professional audio standards.",
      link: "https://youtu.be/JovBSduu22w?si=MfCmtYOWyVpZN1R4"
    },
  ];

  return (
    <div className='about-wrapper'>
      <div className='title'>About</div>
      <div className='about-description'>
        I'm a passionate sound designer and Foley artist dedicated to crafting immersive soundscapes that enhance storytelling in film and television. With a sharp ear for detail and a creative approach, I collaborate closely with filmmakers to deliver emotionally resonant audio that elevates the viewing experience. Open to new collaborations, I bring expertise and enthusiasm to every project I work on.
      </div>

      <div className='projects-list'>
        {projects.map((project, index) => {
          const isExpanded = expandedDescriptions.includes(index);
          const words = project.description.split(' ');
          const shouldTruncate = words.length > 10;
          const displayedText = isExpanded || !shouldTruncate
            ? project.description
            : words.slice(0, 10).join(' ') + '...';

          return (
            <div className='project-image-description' key={index}>
              <img
                className='project-cover-image'
                src={project.cover_image}
                alt={project.project}
              />
              <div className='project-name-description'>
                <div className='project-name-link'>
                  <div className='project-name'>{project.project}</div>
                  {project.link && (
                    <img
                    src="/assets/icons/hyperlink.svg"
                    // src="/assets/icons/youtube.svg"
                    alt="link"
                      width={24}
                      style={{ cursor: 'pointer' }}
                      onClick={() => window.open(project.link, '_blank')}
                    />
                  )}
                </div>
                <div className='project-description'>
                  {displayedText}
                  {shouldTruncate && (
                    <span
                      onClick={() => toggleDescription(index)}
                      style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
                    >
                      {isExpanded ? 'less' : 'more...'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
