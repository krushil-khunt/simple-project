const Listing=require("../models/listing.js");

module.exports.index=async(req,res,next)=>{
   const alllisitn=await Listing.find({});
   res.render("listing/index.ejs",{alllisitn});
}

module.exports.rendernewfrom=(req,res)=>{
    res.render("listing/new.ejs");
}

module.exports.showListing=async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you equested for dose not exist!");
        return res.redirect("/listing");
    }
    console.log(listing);
    res.render("listing/show.ejs",{listing})
};

module.exports.creatingListing=async(req,res,next)=>{
    const newlisting= new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    await newlisting.save();
    req.flash("succes","New Listing Created");
    res.redirect("/listing");
};

module.exports.renderEditfrom=async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you equested for dose not exist!");
        return res.redirect("/listing");
    }
    res.render("listing/edit.ejs",{listing});
};

module.exports.updateListing=async(req,res,next)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("succes","Listinh Updated");
    res.redirect(`/listing/${id}`);
};

module.exports.destoryListing=async(req,res,next)=>{
    let {id}=req.params;
    let deletlisting=await Listing.findByIdAndDelete(id);
    console.log(deletlisting);
    req.flash("succes","Listing Delete");
    res.redirect("/listing");
};