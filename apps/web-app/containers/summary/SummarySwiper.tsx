import { Col, Row, Typography } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube } from 'swiper';
import type { Swiper as SwiperType } from 'swiper';
import { Segmented } from 'antd';
import { useEffect, useState } from 'react';

import SummaryCard from '@/components/summary/SummaryCard';
import SummaryType from '@/enums/SummaryType';

import 'swiper/css';
import 'swiper/css/effect-cube';

const SummarySwiper = () => {
  const [summaryType, setSummaryType] = useState(SummaryType.DAILY);
  const [swiperRef, setSwiperRef] = useState<SwiperType>(null);

  useEffect(() => {
    if (swiperRef) {
      swiperRef.slideTo(
        Object.values(SummaryType).findIndex((e) => e === summaryType)
      );
    }
  }, [summaryType, swiperRef]);

  return (
    <Row justify="center">
      <Col xs={20} sm={16} md={15} lg={15} xl={8} xxl={8}>
        <Row>
          <Col flex={1} className="flex justify-between">
            <Typography.Title level={4}>Summary</Typography.Title>
            <Segmented
              value={summaryType}
              options={Object.values(SummaryType).map((e) => {
                return { label: e.capitalize(), value: e };
              })}
              onChange={(value) => setSummaryType(value as SummaryType)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Swiper
              onSwiper={setSwiperRef}
              slidesPerView={1}
              onSlideChange={(instance) => {
                setSummaryType(
                  Object.values(SummaryType)[instance.activeIndex]
                );
              }}
              effect="cube"
              modules={[EffectCube]}
              // cubeEffect={{
              //   shadow: true,
              //   slideShadows: true,
              //   shadowOffset: 20, // 陰影偏移
              //   shadowScale: 0.94, // 陰影比例
              // }}
            >
              {Object.values(SummaryType).map((item) => (
                <SwiperSlide key={item}>
                  <SummaryCard type={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SummarySwiper;
