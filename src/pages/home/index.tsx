import { memo, useEffect, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';

import { HeaderHome } from './[header]';
import { BodyHome } from './[header]/[body]';
import { FooterHome } from './[header]/[body]/[footer]';
import { AboutCompany } from './about-company';
import { CommentCustomer } from './comment-customer';
import { PartnerCompany } from './partner';
import { ProjectHighLight } from './project';

type Iprops = {
  isLoading?: boolean;
};
const Component = (props: Iprops) => {
  const bodyHomeRef = useRef(null);
  const projectHighlightRef = useRef(null);
  const commentCustomerRef = useRef(null);
  const aboutCompanyRef = useRef(null);
  const partnerCompanyRef = useRef(null);
  const [isAwardScroll, setIsAwardScroll] = useState(false);
  const { isLoading = false } = props;
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAwardScroll(true);
            // Phần tử này hiện ra trong viewport, thêm hiệu ứng vào đây
            entry.target.classList.add('fly');
            // Ngừng quan sát phần tử sau khi thêm animation
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1, // Phần tử hiển thị 10% mới kích hoạt
      }
    );

    // Thêm các phần tử để quan sát
    if (!isLoading) {
      if (bodyHomeRef.current) {
        observer.observe(bodyHomeRef.current);
      }
      if (projectHighlightRef.current) {
        observer.observe(projectHighlightRef.current);
      }
      if (commentCustomerRef.current) {
        observer.observe(commentCustomerRef.current);
      }
      if (aboutCompanyRef.current) {
        observer.observe(aboutCompanyRef.current);
      }
      if (partnerCompanyRef.current) {
        observer.observe(partnerCompanyRef.current);
      }
    }
    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [isLoading]);
  if (isLoading) {
    return null;
  }
  return (
    <div className="bg-common-1000">
      <div className="bg-common-1000">
        <div ref={bodyHomeRef}>
          <HeaderHome />
          <BodyHome />
          <FooterHome />
        </div>

        <div ref={projectHighlightRef}>
          <ProjectHighLight />
        </div>
        <div ref={commentCustomerRef}>
          <CommentCustomer />
        </div>
        <div ref={aboutCompanyRef}>
          <AboutCompany isCount={isAwardScroll} />
        </div>
        <div ref={partnerCompanyRef}>
          <PartnerCompany />
        </div>
      </div>
    </div>
  );
};
export const HomePage = memo(Component, isEqual);
