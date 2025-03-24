const customerValidateBody = (body) => {
    const requiredFields = ['nik', 'nama','email','nomor_telepon','alamat','username','password']
    const missingFields = {}
    requiredFields.forEach((field) =>{
        if (!body[field]) {
            missingFields[field] = "missing"
        }
    })
    return  Object.keys(missingFields).length>0? missingFields : null
}

module.exports = customerValidateBody