status="";
img="";
objects = [];
function setup()
{
    canvas=createCanvas(640,420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}

function preload()
{
    img=loadImage('laptop.jpg');
}

function draw()
{
    image(img,0,0,640,420);

    if(status != "")
    {
        for(i = 0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status: Object Dectected";
            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function ModelLoaded()
{
    console.log("Model Loaded");
    status=true; 
    objectDetector.detect(img,gotResult);
}
 
function gotResult(error , results)
{
   if(error)
   {
       console.log(error);
   }
   console.log(results);
   objects = results;
}