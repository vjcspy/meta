const Footer = () => {
    return (
        <div>
            <p className="pt-6 text-center dark:text-white-dark ltr:sm:text-left rtl:sm:text-right">
                © {new Date().getFullYear()}. Meta.
            </p>
        </div>
    );
};

export default Footer;
