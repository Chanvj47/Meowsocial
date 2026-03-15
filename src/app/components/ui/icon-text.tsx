interface Object {
text : String,
icon : any
}

export const IconText = (props:Object) => {
    const Icon = props.icon
return (
<>
<Icon className="w-4 h-4 text-orange-500" />
<span>{props.text}</span>
</>
) ;
}