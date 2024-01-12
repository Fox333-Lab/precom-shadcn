import { Card } from "../ui/card";
import "./style.css";
const Hero = () => {
  return (
    <div className="" id="hero" style={{ height: "600px" }}>
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <Card
          id="hero1Container"
          className="relative shadow-none bg-gray-50 border-none"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
          repellendus qui animi est dolore! Quidem quas quos, cupiditate itaque
          accusantium ipsa possimus commodi labore eveniet quia dolore, iusto
          sit exercitationem?
        </Card>
        <div className="flex flex-col gap-6" id="hero2Container">
          <Card className="flex-1 shadow-none bg-gray-50 border-none">
            hhhd
          </Card>
          <Card className="flex-1 shadow-none bg-gray-50 border-none">
            hhhd2
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;
