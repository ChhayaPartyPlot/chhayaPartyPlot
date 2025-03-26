'use client'
import TiltedCard from './TitleCard';
import ChangingText from './changing-text';

export default function CelebrationSection() {
  return (
    <div className="text-center mt-12 px-4">
      <h1 className="text-3xl md:text-4xl">
        Great place to Celebrate <ChangingText />
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center mt-6 p-4">
        <TiltedCard
          imageSrc="/image1.jpeg"
          altText="Wedding"
          captionText="Wedding"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={10}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={<p className="tilted-card-demo-text p-2">Wedding</p>}
        />
        <TiltedCard
          imageSrc="/image1.jpeg"
          altText="Birthday Party"
          captionText="Birthday Party"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={10}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={<p className="tilted-card-demo-text p-2">Birthday Party</p>}
        />
        <TiltedCard
          imageSrc="/image1.jpeg"
          altText="Business Party"
          captionText="Business Party"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={10}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={<p className="tilted-card-demo-text p-2">Business Party</p>}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center mt-6 p-4">
        <TiltedCard
          imageSrc="/image1.jpeg"
          altText="Wedding"
          captionText="Wedding"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={10}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={<p className="tilted-card-demo-text p-2">Wedding</p>}
        />
        <TiltedCard
          imageSrc="/image1.jpeg"
          altText="Birthday Party"
          captionText="Birthday Party"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={10}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={<p className="tilted-card-demo-text p-2">Birthday Party</p>}
        />
        <TiltedCard
          imageSrc="/image1.jpeg"
          altText="Business Party"
          captionText="Business Party"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={10}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={<p className="tilted-card-demo-text p-2">Business Party</p>}
        />
      </div>
    </div>
  );
}